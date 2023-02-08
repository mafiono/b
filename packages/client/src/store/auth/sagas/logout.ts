import { put } from 'redux-saga/effects';
import { CoinType } from '@betnomi/libs/types';
import { authSetState, authSetTokens, authSetUser } from '../actionCreators';
import { authInitialState } from '../index';

export function* authLogoutSaga() {
  yield put(authSetTokens('', '', ''));
  yield put(authSetUser(authInitialState.user));
  yield put(authSetState({ currency: CoinType.bitcoin }));
}
