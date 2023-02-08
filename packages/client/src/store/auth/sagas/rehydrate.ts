import { RehydrateAction } from 'redux-persist/es/types';
import {
  all, call, put, select, 
} from 'redux-saga/effects';
import { PersistKeys } from '../../../constants/persist';
import { Unwrap } from '../../../types/unwrap';
import { authGetRanks } from '../api';
import { authReady, authSetRanks } from '../actionCreators';
import { authFetchUserSaga } from './login';
import { selectAuthTokens } from '../selectors';
import { affiliateRanksToPlayerLevel } from '../../../utils/api/transforms';

function* getRanks() {
  try {
    const { data }: Unwrap<typeof authGetRanks> = yield call(authGetRanks);
    yield put(authSetRanks({ list: affiliateRanksToPlayerLevel(data) }));
  } catch (e) {
    console.warn(e);
    // TODO: handle it
  }
}

export function* authRehydrateSaga({ key }: RehydrateAction) {
  if (key !== PersistKeys.Auth) {
    return;
  }

  yield put(authReady());
  
  const { access, refresh }: ReturnType<typeof selectAuthTokens> = yield select(selectAuthTokens);
  const effects = [call(getRanks), ...(access && refresh ? [call(authFetchUserSaga)] : [])];
  yield all(effects);
}
