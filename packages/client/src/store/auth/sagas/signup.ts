import { call, put } from 'redux-saga/effects';
import { signUpErrorResponseToError } from 'utils/api/transforms';
import { modalHide } from 'store/modal/actionCreators';
import { authSetSignUp, authSignUp } from '../actionCreators';
import { authCheckLoginExists, authPostSignUp } from '../api';
import { Unwrap } from '../../../types/unwrap';
import { authLoginCallSaga } from './login';

export function* authSignUpSaga({
  payload: {
    values: {
      email, password, username, referralCode,
    },
    callback,
  },
}: ReturnType<typeof authSignUp>) {
  try {
    yield put(authSetSignUp({ isLoading: true }));

    const exist: Unwrap<typeof authCheckLoginExists> = yield call(
      authCheckLoginExists,
      username,
    );
    if (exist) {
      throw new Error('Username already taken');
    }

    yield call(authPostSignUp, email, username, password, referralCode);
    yield call(authLoginCallSaga, email, password);
    yield put(modalHide());
    callback();
  } catch (error) {
    yield put(authSetSignUp({ error: error.message }));
    callback(signUpErrorResponseToError(error));
  } finally {
    yield put(authSetSignUp({ isLoading: false }));
  }
}
