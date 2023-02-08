import { call, put, select } from 'redux-saga/effects';
import { authOAuthLogin, authOAuthSignup, authSetOAuth } from '../actionCreators';
import { modalHide, modalShow } from '../../modal/actionCreators';
import { ModalType } from '../../modal/types';
import { selectAuthOAuth } from '../selectors';
import { authCheckLoginExists, authPostOAuthSignup } from '../api';
import { AuthOAuthSignupRequest } from '../types';
import { Unwrap } from '../../../types/unwrap';
import { authSetTokensAndFetchUserDataSaga } from './login';

export function* oauthLoginSaga({
  payload: { data },
}: ReturnType<typeof authOAuthLogin>) {
  const { session } = data.payload;

  if (session?.access && session?.refresh) {
    yield call(authSetTokensAndFetchUserDataSaga, {
      ...session,
      playCurrency: session.play_currency,
    });
    yield put(modalHide()); 
    return;
  }

  yield put(
    authSetOAuth({
      token: data.payload.token,
      provider: data.payload.provider,
    }),
  );

  yield put(modalShow(ModalType.OAuthSignup));
}

export function* oauthSignupSaga({
  payload,
  callback,
}: ReturnType<typeof authOAuthSignup>) {
  try {
    const { token }: ReturnType<typeof selectAuthOAuth> = yield select(
      selectAuthOAuth,
    );

    const request: AuthOAuthSignupRequest = {
      login: payload.login,
    };

    const exist: Unwrap<typeof authCheckLoginExists> = yield call(
      authCheckLoginExists,
      payload.login,
    );
    if (exist) {
      throw new Error('Username already taken');
    }

    const {
      data,
    }: Unwrap<typeof authPostOAuthSignup> = yield call(
      authPostOAuthSignup,
      request,
      token,
    );

    callback();
    yield call(authSetTokensAndFetchUserDataSaga, data);
    yield put(modalHide());
  } catch (e) {
    callback(e.message);
  }
}
