import { CoinType } from '@betnomi/libs/types';
import axios from 'axios';
import { api } from '../../utils/api';
import { ApiPaths } from '../../utils/api/constants';
import { RatesGetRateResponse } from './types';

export const ratesGetRate = (quoteCurrency: CoinType, baseCurrency = 'USD') => {
  const cancelTokenSource = axios.CancelToken.source();

  return {
    request: api.get<RatesGetRateResponse>(ApiPaths.GetRates, {
      params: { baseCurrency, quoteCurrency },
      cancelToken: cancelTokenSource.token,
    }),
    cancel: cancelTokenSource.cancel,
  };
};
