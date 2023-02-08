import { CoinType } from '@betnomi/libs/types';

export const withdrawPairs: Partial<Record<CoinType, CoinType[]>> = {
  [CoinType.tether]: [CoinType.erc20, CoinType.bep20, CoinType.trc20],
};
