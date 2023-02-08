import { call, put, select } from 'redux-saga/effects';
import { showErrorToast } from '@betnomi/libs/components/Toaster';
import { authSelectCurrency, authSetState } from '../actionCreators';
import { authRefreshCallSaga } from './refresh';
import { selectAuth } from '../selectors';
import { transformBackendErrorToString } from '../../../utils/api/transforms';

export function* authSelectCurrencySaga({
  payload: { currency },
}: ReturnType<typeof authSelectCurrency>) {
  const { currency: current } = yield select(selectAuth);

  try {
    yield put(
      authSetState({
        currency,
      }),
    );

    yield call(authRefreshCallSaga);
  } catch (e) {
    showErrorToast(transformBackendErrorToString(e));
    yield put(authSetState({ currency: current }));
  }
}
