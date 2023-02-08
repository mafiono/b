import { values } from 'ramda';
import { useMemo } from 'react';
import { PlayerLevel } from '../../types/casino/levels';

export const useFakeLevels = () => useMemo<Record<PlayerLevel, PlayerLevel>>(
  () =>
    values(PlayerLevel).reduce(
      (acc, level) => ({ ...acc, [level]: level }),
      {} as Record<PlayerLevel, PlayerLevel>,
    ),
  [],
);
