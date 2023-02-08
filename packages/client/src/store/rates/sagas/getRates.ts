import {
  call, delay, put, select, take, 
} from 'redux-saga/effects';
import { coinOrder, CoinType } from '@betnomi/libs/types';
import { AxiosResponse } from 'axios';
import { ratesSetRates, ratesSetState } from '../actionCreators';
import { ratesGetRate } from '../api';
import { Unwrap } from '../../../types/unwrap';
import { RatesGetRateResponse } from '../types';
import { AuthActionTypes } from '../../auth/actionsTypes';
import { selectAuth } from '../../auth/selectors';
import { authSetTokens } from '../../auth/actionCreators';

const refreshDelay = 60 * 10 * 1000;
const errorDelay = 5 * 1000;

const getRates = async () => {
  const result = await Promise.all(
    coinOrder.map(async (coin) =>
      ratesGetRate(coin).request.catch(
        () => ({ data: { rate: 0 } } as AxiosResponse<RatesGetRateResponse>),
      )),
  );

  return result.reduce(
    (acc, item, i) => (item.data.rate !== 0 ? { ...acc, [coinOrder[i]]: 1 / item.data.rate } : acc),
    {} as Record<CoinType, number>, 
  );
};

export function* getRatesSaga() {
  // wait for tokens to be rehydrated
  yield take(AuthActionTypes.Ready);

  // TODO: remove this, when rates become available for guests
  const { access, refresh }: ReturnType<typeof selectAuth> = yield select(selectAuth);
  if (!access || !refresh) {
    yield take(authSetTokens);
  }

  while (true) {
    try {
      const rates: Unwrap<typeof getRates> = yield call(getRates);

      yield put(ratesSetRates(rates));
      yield put(
        ratesSetState({
          lastLoadedAt: new Date(),
        }),
      );
      yield delay(refreshDelay);
    } catch (e) {
      // eslint-disable-next-line no-console
      console.warn(e);
      yield delay(errorDelay);
    }
  }
}
