import { call, put } from 'redux-saga/effects';
import { modalHide } from 'store/modal/actionCreators';
import { signInTelegramErrorResponseToError } from 'utils/api/transforms';
import { TelegramUser } from '../../../types/store/auth';
import {
  authLoginTelegram,
  authLogout,
  authSetLogin,
} from '../actionCreators';
import {
  authPostLogin, 
  authPostLoginTelegram,
} from '../api';
import { Unwrap } from '../../../types/unwrap';
import { getDeviceName, getDeviceUUID } from '../../../utils/api/device_uuid';
import { authSetTokensAndFetchUserDataSaga } from './login';

export function* authLoginTelegramCallSaga(telegram: TelegramUser) {
  const deviceId = getDeviceUUID();
  const deviceName = getDeviceName();
  const {
    data, 
  }: Unwrap<typeof authPostLogin> = yield call(
    authPostLoginTelegram,
    { ...telegram, id: String(telegram.id), auth_date: String(telegram.auth_date) },
    deviceId,
    deviceName,
  );
  
  yield call(authSetTokensAndFetchUserDataSaga, data);
}

export function* authLoginWithTelegramSaga({
  payload: { telegram, callback },
}: ReturnType<typeof authLoginTelegram>) {
  try {
    yield put(authSetLogin({ isLoading: true }));
    yield call(authLoginTelegramCallSaga, telegram);
    yield put(modalHide());
    callback();
  } catch (error) {
    yield put(authLogout({ reason: error.message }));
    yield put(authSetLogin({ error: error.message }));
    callback(signInTelegramErrorResponseToError(error.response.data));
  } finally {
    yield put(authSetLogin({ isLoading: false }));
  }
}
