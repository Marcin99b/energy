import type { Impact } from '../types';

export interface CreateEnergyEntryRequest {
  id: string;
  activity: string;
  context: string | null;
  energy: number;
  impact: Impact;
  note: string;
}

export interface EnergyEntryDto extends CreateEnergyEntryRequest {
  createdAt: string;
}

export interface PageMeta {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface EnergyEntryListResponse {
  data: EnergyEntryDto[];
  meta: PageMeta;
}

export interface ProblemDetails {
  type: string;
  title: string;
  status: number;
  detail: string;
  errors?: Record<string, string[]>;
}
