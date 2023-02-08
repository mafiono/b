import { call, put } from 'redux-saga/effects';
import { modalHide } from 'store/modal/actionCreators';
import { getAddress } from 'utils/ethereum/getAddress';
import { signMessage } from 'utils/ethereum/signMessage';
import {
  authLoginWithMetamask,
  authLogout,
  authSetLogin,
} from '../actionCreators';
import {
  authPostLogin, 
  authPostLoginMetamask,
  authPutMetamaskPreSigned,
} from '../api';
import { Unwrap } from '../../../types/unwrap';
import { getDeviceName, getDeviceUUID } from '../../../utils/api/device_uuid';
import { signInErrorResponseToError } from '../../../utils/api/transforms';
import { authSetTokensAndFetchUserDataSaga } from './login';

export function* authLoginMetamaskCallSaga(address: string, signature: string) {
  const deviceId = getDeviceUUID();
  const deviceName = getDeviceName();
  const {
    data,
  }: Unwrap<typeof authPostLogin> = yield call(
    authPostLoginMetamask,
    address,
    signature,
    deviceId,
    deviceName,
  );
  
  yield call(authSetTokensAndFetchUserDataSaga, data);
}

export function* authLoginWithMetamaskSaga({
  payload: { callback },
}: ReturnType<typeof authLoginWithMetamask>) {
  try {
    yield put(authSetLogin({ isLoading: true }));

    const address: Unwrap<typeof getAddress> = yield call(getAddress);    
    const {
      data: { nonce },
    }: Unwrap<typeof authPutMetamaskPreSigned> = yield call(authPutMetamaskPreSigned, address);
    const { signature }: Unwrap<typeof signMessage> = yield call(signMessage, nonce);
    yield call(authLoginMetamaskCallSaga, address, signature);
    yield put(modalHide());
    callback();
  } catch (error) {
    yield put(authLogout({ reason: error.message }));
    yield put(authSetLogin({ error: error.message }));
    callback(signInErrorResponseToError(error.response.data));
  } finally {
    yield put(authSetLogin({ isLoading: false }));
  }
}
