import { CoinType } from '@betnomi/libs/types';
import axios from 'axios';
import { api } from '.';
import { ApiPaths } from './constants';

type ProfileGetDepositAddressResponse = {
  currency: string;
  wallet: string;
};

export const profileGetDepositAddressApi = (
  currency: CoinType | string,
) => {
  const cancelTokenSource = axios.CancelToken.source();

  return {
    cancel: cancelTokenSource.cancel,
    request: api.post<ProfileGetDepositAddressResponse>(ApiPaths.ProfileDeposit, {
      currency,
      cancelToken: cancelTokenSource.token,
    }),
  };
};
