import { apiRequest } from './client';
import { toCreateRequest, toEnergyEntry } from './mappers';
import type { EnergyEntry, NewEntryInput } from '../types';
import type { EnergyEntryDto, EnergyEntryListResponse } from './types';

export const energyEntriesApi = {
  list: async (): Promise<EnergyEntry[]> => {
    const response = await apiRequest<EnergyEntryListResponse>('/energy-entries', {
      searchParams: { page: 1, pageSize: 100, sort: '-createdAt' }
    });
    return response.data.map(toEnergyEntry);
  },

  create: async (id: string, entry: NewEntryInput): Promise<EnergyEntry> => {
    const dto = await apiRequest<EnergyEntryDto>('/energy-entries', {
      method: 'POST',
      body: toCreateRequest(id, entry)
    });
    return toEnergyEntry(dto);
  }
};
