import { call, put } from 'redux-saga/effects';
import { modalHide } from 'store/modal/actionCreators';
import { getAddress } from 'utils/ethereum/getAddress';
import { signMessage } from 'utils/ethereum/signMessage';
import { authSetSignUp, authSignUpWithMetamask } from '../actionCreators';
import {
  authCheckLoginExists, 
  authPostSignUpMetamask, 
  authPutMetamaskPreSigned, 
} from '../api';
import { Unwrap } from '../../../types/unwrap';
import { authLoginMetamaskCallSaga } from './loginWithMetamask';

export function* authSignUpMetamaskSaga({
  payload: {
    values: {
      login, referralCode,
    },
    callback,
  },
}: ReturnType<typeof authSignUpWithMetamask>) {
  try {
    yield put(authSetSignUp({ isLoading: true }));

    const exist: Unwrap<typeof authCheckLoginExists> = yield call(
      authCheckLoginExists,
      login,
    );
    if (exist) {
      throw new Error('Username already taken');
    }

    const address: Unwrap<typeof getAddress> = yield call(getAddress);
    const {
      data: { nonce },
    }: Unwrap<typeof authPutMetamaskPreSigned> = yield call(authPutMetamaskPreSigned, address);
    const { signature }: Unwrap<typeof signMessage> = yield call(signMessage, nonce);

    yield call(authPostSignUpMetamask, address, signature, login, referralCode);
    yield call(authLoginMetamaskCallSaga, address, signature);
    yield put(modalHide());
    callback();
  } catch (error) {
    yield put(authSetSignUp({ error: error.message }));
    callback(error);
  } finally {
    yield put(authSetSignUp({ isLoading: false }));
  }
}
