import { call, put, select } from 'redux-saga/effects';
import { showErrorToast } from '@betnomi/libs/components/Toaster';
import { authLogout, authSetTokens } from '../actionCreators';
import { authRefresh } from '../api';
import { selectAuth } from '../selectors';
import { Unwrap } from '../../../types/unwrap';
import { transformBackendErrorToString } from '../../../utils/api/transforms';

export function* authRefreshCallSaga() {
  const {
    refresh: token,
    currency,
  }: ReturnType<typeof selectAuth> = yield select(selectAuth);

  const {
    data: { access, refresh, game },
  }: Unwrap<typeof authRefresh> = yield call(authRefresh, token, currency);

  yield put(authSetTokens(access, refresh, game));
}

export function* authOnRefreshSaga() {
  try {
    yield call(authRefreshCallSaga);
  } catch (e) {
    showErrorToast(transformBackendErrorToString(e));
    yield put(authLogout());
  }
}
