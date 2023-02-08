import { RehydrateAction } from 'redux-persist/es/types';
import { call } from 'redux-saga/effects';
import { PersistKeys } from '../../../constants/persist';
import { chatConnectCentrifuge } from './guestToken';

export function* chatRehydrateSaga({ key }: RehydrateAction) {
  if (key !== PersistKeys.Auth) {
    return;
  }

  yield call(chatConnectCentrifuge);
}
