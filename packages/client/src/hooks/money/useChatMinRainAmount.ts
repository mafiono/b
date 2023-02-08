import { useEffect, useState } from 'react';
import { CoinType } from '@betnomi/libs/types';
import { chatGetRainMinAmount } from '../../store/chat/api';
import { useRates } from './useRates';

export const useChatMinRainAmount = (currency: CoinType) => {
  const [amount, setAmount] = useState(0);
  const { fromUSD } = useRates();

  useEffect(() => {
    const { cancel, request } = chatGetRainMinAmount();

    request.then((result) => setAmount(result.data.usd || 0)).catch(() => {});

    return () => {
      if (cancel) {
        cancel();
      }
    };
  }, []);

  return fromUSD(currency)(amount);
};
