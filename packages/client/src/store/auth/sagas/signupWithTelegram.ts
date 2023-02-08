import { call, put, select } from 'redux-saga/effects';
import { modalHide } from 'store/modal/actionCreators';
import { authSetSignUp, authSignupTelegram } from '../actionCreators';
import {
  authCheckLoginExists, 
  authPostSignUpTelegram, 
} from '../api';
import { Unwrap } from '../../../types/unwrap';
import { selectAuthTelegram } from '../selectors';
import { authLoginTelegramCallSaga } from './loginTelegram';

export function* authSignUpTelegramSaga({
  payload: {
    values: {
      login,
    },
    callback,
  },
}: ReturnType<typeof authSignupTelegram>) {
  try {
    yield put(authSetSignUp({ isLoading: true }));

    const exist: Unwrap<typeof authCheckLoginExists> = yield call(
      authCheckLoginExists,
      login,
    );
    if (exist) {
      throw new Error('Username already taken');
    }

    const telegram: ReturnType<typeof selectAuthTelegram> = yield select(selectAuthTelegram);
    yield call(authPostSignUpTelegram,
      { ...telegram, id: String(telegram.id), auth_date: String(telegram.auth_date) },
      login);
    yield call(authLoginTelegramCallSaga, telegram);
    yield put(modalHide());
    callback();
  } catch (error) {
    yield put(authSetSignUp({ error: error.message }));
    callback(error);
  } finally {
    yield put(authSetSignUp({ isLoading: false }));
  }
}
