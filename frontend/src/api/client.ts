import type { ProblemDetails } from './types';

const BASE_URL = 'https://localhost:8080/api/v1';
const TIMEOUT_MS = 8000;

export class ApiError extends Error {
  readonly status: number | null;
  readonly problem: ProblemDetails | null;

  constructor(message: string, status: number | null, problem: ProblemDetails | null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.problem = problem;
  }
}

type HttpMethod = 'GET' | 'POST';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  searchParams?: Record<string, string | number | undefined>;
}

const buildUrl = (path: string, searchParams: RequestOptions['searchParams']): string => {
  const url = new URL(`${BASE_URL}${path}`);
  for (const [key, value] of Object.entries(searchParams ?? {})) {
    if (value !== undefined) url.searchParams.set(key, String(value));
  }
  return url.toString();
};

const parseProblem = async (response: Response): Promise<ProblemDetails | null> => {
  try {
    return (await response.json()) as ProblemDetails;
  } catch {
    return null;
  }
};

export const apiRequest = async <T>(path: string, options: RequestOptions = {}): Promise<T> => {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), TIMEOUT_MS);

  try {
    const response = await fetch(buildUrl(path, options.searchParams), {
      method: options.method ?? 'GET',
      headers: { 'Content-Type': 'application/json' },
      body: options.body ? JSON.stringify(options.body) : undefined,
      signal: controller.signal
    });

    if (!response.ok) {
      const problem = await parseProblem(response);
      throw new ApiError(problem?.title ?? `Request failed with status ${response.status}`, response.status, problem);
    }

    return (await response.json()) as T;
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof DOMException && error.name === 'AbortError') {
      throw new ApiError('Request timed out', null, null);
    }
    throw new ApiError('Network error', null, null);
  } finally {
    clearTimeout(timeout);
  }
};
