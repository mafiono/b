import { takeEvery, takeLeading } from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/es/constants';
import { AuthActionTypes } from '../actionsTypes';
import { authLoginSaga } from './login';
import { authSignUpSaga } from './signup';
import { authSelectCurrencySaga } from './currency';
import { authLogoutSaga } from './logout';
import { authRehydrateSaga } from './rehydrate';
import { authRestorePasswordSaga } from './restorepassword';
import { authOnRefreshSaga } from './refresh';
import { oauthLoginSaga, oauthSignupSaga } from './oauth';
import { authLoginWithMetamaskSaga } from './loginWithMetamask';
import { authSignUpMetamaskSaga } from './signupWithMetamask';
import { authLoginWithTelegramSaga } from './loginTelegram';
import { authSignUpTelegramSaga } from './signupWithTelegram';

export default function* authSaga() {
  yield takeLeading(AuthActionTypes.Login, authLoginSaga);
  yield takeLeading(AuthActionTypes.SignUp, authSignUpSaga);
  yield takeLeading(AuthActionTypes.SelectCurrency, authSelectCurrencySaga);
  yield takeLeading(AuthActionTypes.Logout, authLogoutSaga);
  yield takeEvery(REHYDRATE, authRehydrateSaga);
  yield takeLeading(AuthActionTypes.RestorePassword, authRestorePasswordSaga);
  yield takeLeading(AuthActionTypes.Refresh, authOnRefreshSaga);
  yield takeLeading(AuthActionTypes.OAuthLogin, oauthLoginSaga);
  yield takeLeading(AuthActionTypes.OAuthSignup, oauthSignupSaga);
  yield takeLeading(AuthActionTypes.LoginMetamask, authLoginWithMetamaskSaga);
  yield takeLeading(AuthActionTypes.SignUpMetamask, authSignUpMetamaskSaga);
  yield takeLeading(AuthActionTypes.LoginTelegram, authLoginWithTelegramSaga);
  yield takeLeading(AuthActionTypes.SignUpTelegram, authSignUpTelegramSaga);
}
