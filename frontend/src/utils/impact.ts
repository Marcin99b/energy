import type { ContextBreakdown, Impact } from '../types';

export const IMPACT_ARROWS: Record<Impact, string> = {
  increase: '↑',
  decrease: '↓'
};

export const DOMINANT_ARROWS: Record<ContextBreakdown['dominant'], string> = {
  increase: IMPACT_ARROWS.increase,
  decrease: IMPACT_ARROWS.decrease,
  mixed: '↔'
};
