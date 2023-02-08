import { useMemo } from 'react';
import { CoinType, emptyBalances } from '../../types';

export const useFakeBalances = () => useMemo<Record<CoinType, number>>(() => emptyBalances, []);
