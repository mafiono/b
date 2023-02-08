import {
  useCallback, useEffect, useRef, useState, 
} from 'react';
import { CoinType } from '@betnomi/libs/types';
import { Canceler } from 'axios';
import { profileGetDepositAddressApi } from '../../utils/api/wallet';

export const useGetDepositAddress = (coin: string) => {
  const [depositAddress, setDepositAddress] = useState('');
  const [isLoadingDepositAddress, setIsLoadingDepositAddress] = useState(false);
  const canceler = useRef<Canceler>();

  const onGetDepositAddress = useCallback((currency: CoinType | string) => {
    const fetcher = profileGetDepositAddressApi(currency);

    const { cancel, request } = fetcher;
    canceler.current = cancel;

    setIsLoadingDepositAddress(true); 

    request
      .then((result) => setDepositAddress(result.data.wallet))
      .catch(() => setDepositAddress(''))
      .finally(() => { setIsLoadingDepositAddress(false); });
  }, [setDepositAddress, setIsLoadingDepositAddress]);

  useEffect(() => {
    onGetDepositAddress(coin);

    return () => {
      if (canceler.current) {
        canceler.current();
      }
    };
  }, [coin]);

  return {
    depositAddress, isLoadingDepositAddress,
  };
};
