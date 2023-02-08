import { CoinType } from '@betnomi/libs/types';

export interface RatesState {
  lastLoadedAt?: Date;
  rates: Record<CoinType, number>;
}
