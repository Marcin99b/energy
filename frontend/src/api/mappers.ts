import type { EnergyEntry, NewEntryInput } from '../types';
import type { CreateEnergyEntryRequest, EnergyEntryDto } from './types';

export const toEnergyEntry = (dto: EnergyEntryDto): EnergyEntry => ({
  id: dto.id,
  ts: new Date(dto.createdAt).getTime(),
  activity: dto.activity,
  context: dto.context,
  energy: dto.energy,
  impact: dto.impact,
  note: dto.note
});

export const toCreateRequest = (id: string, entry: NewEntryInput): CreateEnergyEntryRequest => ({
  id,
  activity: entry.activity,
  context: entry.context,
  energy: entry.energy,
  impact: entry.impact,
  note: entry.note
});
