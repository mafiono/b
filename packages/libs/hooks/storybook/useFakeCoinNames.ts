import { keys } from 'ramda';
import { useMemo } from 'react';
import { coinNames, CoinType } from '../../types/ui';

export const useFakeCoinNames = () =>
  useMemo(
    () =>
      keys(coinNames).reduce(
        (acc, key) => ({ ...acc, [coinNames[key]]: key }),
        {} as Record<string, CoinType>,
      ),
    [],
  );
