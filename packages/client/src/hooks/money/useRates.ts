import { useCallback } from 'react';
import { CoinType } from '@betnomi/libs/types';
import useShallowSelector from '../useShallowSelector';
import { selectRatesRates } from '../../store/rates/selectors';

export const useRates = () => {
  const rates = useShallowSelector(selectRatesRates);
  const getRate = useCallback((currency: CoinType) => rates[currency] || 0, [
    rates,
  ]);
  const toUSD = useCallback(
    (currency: CoinType) => (amount: number) => getRate(currency) * amount,
    [getRate],
  );
  const fromUSD = useCallback(
    (currency: CoinType) => (amount: number) =>
      (getRate(currency) ? amount / getRate(currency) : 0),
    [getRate],
  );

  return {
    rates,
    toUSD,
    getRate,
    fromUSD,
  };
};
