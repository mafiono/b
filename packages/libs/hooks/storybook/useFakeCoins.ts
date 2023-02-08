import { useMemo } from 'react';
import { coinOrder, CoinType } from '../../types/ui';

export const useFakeCoins = () =>
  useMemo<Record<CoinType, CoinType>>(
    () =>
      coinOrder.reduce(
        (acc, coin) => ({ ...acc, [coin]: coin }),
        {} as Record<CoinType, CoinType>,
      ),
    [],
  );
