# Energy Tracker API — design

Backend does not exist yet. This document specifies the contract the frontend is built against
(`src/api/*`), so a real implementation can be dropped in later without touching the UI.

Base URL (local dev): `https://localhost:8080`. All endpoints are prefixed with `/api/v1`.

## Conventions

- JSON over HTTPS. Every request/response with a body sends `Content-Type: application/json; charset=utf-8`.
- Resource names are plural, kebab-case: `/energy-entries`.
- Versioned via URL prefix (`/api/v1`). A breaking change gets `/api/v2`, not a header flag.
- Timestamps are ISO 8601 UTC strings (`"2026-07-12T14:32:00.000Z"`), never epoch numbers — unambiguous
  across client and server regardless of local timezone or numeric precision.
- IDs are client-generated UUIDv4 strings, sent by the client and echoed back by the server. This makes
  `POST` safe to retry (same id = same logical entry, see below) and lets the UI display an entry
  immediately without waiting on a server-assigned id — required for the optimistic, offline-friendly
  UI this app uses.
- List endpoints are always paginated, sorted, and filterable via query params. No endpoint returns an
  unbounded collection.
- Errors follow [RFC 7807](https://www.rfc-editor.org/rfc/rfc7807) (`application/problem+json`).
- CORS: the API must allow the app's dev origin with credentials disabled — this app uses no cookies;
  a future auth scheme would use `Authorization: Bearer <token>`, not sessions.

## Resource: Energy Entry

```ts
interface EnergyEntryDto {
  id: string;                        // UUID v4, client-generated
  activity: string;
  context: string | null;
  energy: number;                    // 0–10 inclusive
  impact: 'increase' | 'decrease';
  note: string;
  createdAt: string;                 // ISO 8601
}
```

### `GET /api/v1/energy-entries`

List entries, newest first by default.

| query param | type   | default       | notes                          |
|-------------|--------|---------------|---------------------------------|
| `page`      | int    | `1`           | 1-indexed                       |
| `pageSize`  | int    | `50`          | max `200`                       |
| `sort`      | string | `-createdAt`  | `-` prefix = descending         |
| `activity`  | string | —             | exact-match filter              |
| `context`   | string | —             | exact-match filter              |

**200 OK**

```json
{
  "data": [ /* EnergyEntryDto[] */ ],
  "meta": { "page": 1, "pageSize": 50, "total": 132, "totalPages": 3 }
}
```

### `POST /api/v1/energy-entries`

Create an entry. **Idempotent by `id`**: submitting the same `id` twice returns the existing resource
(`200`) instead of creating a duplicate or erroring — this is what makes client-side retries (e.g. after
a timeout where the client can't tell if the first attempt landed) safe to fire again unconditionally.

Request body:

```json
{
  "id": "b3f1c2a0-...-uuid",
  "activity": "granie w siatkówkę",
  "context": "W trakcie",
  "energy": 7,
  "impact": "increase",
  "note": ""
}
```

- `201 Created`, `Location: /api/v1/energy-entries/{id}`, body = the created `EnergyEntryDto`.
- `200 OK` if `id` already existed (replay of the same request) — body = the existing `EnergyEntryDto`.
- `422 Unprocessable Entity` + Problem Details body on validation failure (missing `activity`, `energy`
  outside `0–10`, `impact` not one of the two allowed values, malformed `id`).

### `GET /api/v1/energy-entries/activity-suggestions?query=`

Returns distinct activity names the user has previously logged, ranked by frequency, for autocomplete.
Not yet called by the client — today the app computes this from the already-fetched entry list, which is
cheap at current data volumes. Specified now so it's a drop-in swap once the dataset outgrows a single
page of entries.

### `GET /api/v1/stats/activities`

Server-side equivalent of the client's `computeActivityStats`. Same rationale as above: designed, not
yet wired — the client computes it locally for now.

## Error shape (RFC 7807)

```json
{
  "type": "https://api.energy-tracker.dev/errors/validation",
  "title": "Validation failed",
  "status": 422,
  "detail": "activity must not be empty",
  "errors": { "activity": ["must not be empty"] }
}
```

`type` is a stable, dereferenceable identifier for the error category (for client-side branching);
`title`/`detail` are human-readable; `errors` is present only for `422` and maps field name → messages.

## Status codes in use

`200`, `201`, `400` (malformed JSON body), `422` (validation), `404`, `500`, `503`.

## Client behavior when the API is unreachable

The app is local-first: an entry enters UI state immediately (optimistic), and the `POST` to persist it
runs in the background. If that call fails — network error, timeout, non-2xx — the entry is **not**
rolled back, because a backend being down should never cost the user their input. Concretely, in this
codebase (see `src/hooks/useEnergyEntries.ts`):

- The initial `GET /energy-entries` failing shows a retry affordance instead of blocking the screen.
- A small connection indicator (`online` / `offline`) in the screen header reflects the last request's
  outcome, so the user always knows whether their data is syncing without being interrupted by it.
- Requests time out client-side after 8s (`AbortController`) so a hung connection can't freeze the UI.
