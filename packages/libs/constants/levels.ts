import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import {
  captain, hero, legend, legend2, legend3, legend4, loyal, vip,
} from '../assets/img/levels';

export const LevelColors: Record<PlayerLevel, string> = {
  [PlayerLevel.User]: 'var(--color-button)',
  [PlayerLevel.Loyal]: 'var(--color-loyal)',
  [PlayerLevel.Hero]: 'var(--color-hero)',
  [PlayerLevel.Captain]: 'var(--color-captain)',
  [PlayerLevel.Legend]: 'var(--color-legend)',
  [PlayerLevel.Legend2]: 'var(--color-legend-2)',
  [PlayerLevel.Legend3]: 'var(--color-legend-3)',
  [PlayerLevel.Legend4]: 'var(--color-legend-4)',
  [PlayerLevel.VIP]: 'var(--color-vip)',
};

export const LevelTextColors: Record<PlayerLevel, string> = {
  [PlayerLevel.User]: 'var(--color-white)',
  [PlayerLevel.Loyal]: 'var(--color-black)',
  [PlayerLevel.Hero]: 'var(--color-white)',
  [PlayerLevel.Captain]: 'var(--color-white)',
  [PlayerLevel.Legend]: 'var(--color-white)',
  [PlayerLevel.Legend2]: 'var(--color-white)',
  [PlayerLevel.Legend3]: 'var(--color-white)',
  [PlayerLevel.Legend4]: 'var(--color-white)',
  [PlayerLevel.VIP]: 'var(--color-white)',
};

export const LevelNames: Record<PlayerLevel, string> = {
  [PlayerLevel.User]: 'User',
  [PlayerLevel.Loyal]: 'Loyal',
  [PlayerLevel.Hero]: 'Hero',
  [PlayerLevel.Captain]: 'Captain',
  [PlayerLevel.Legend]: 'Legend',
  [PlayerLevel.Legend2]: 'Legend 2',
  [PlayerLevel.Legend3]: 'Legend 3',
  [PlayerLevel.Legend4]: 'Legend 4',
  [PlayerLevel.VIP]: 'VIP',
};

export const LevelImages: Record<PlayerLevel, string> = {
  [PlayerLevel.User]: '',
  [PlayerLevel.Loyal]: loyal,
  [PlayerLevel.Hero]: hero,
  [PlayerLevel.Captain]: captain,
  [PlayerLevel.Legend]: legend,
  [PlayerLevel.Legend2]: legend2,
  [PlayerLevel.Legend3]: legend3,
  [PlayerLevel.Legend4]: legend4,
  [PlayerLevel.VIP]: vip,
};
