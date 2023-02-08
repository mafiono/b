import { CoinType } from '@betnomi/libs/types';
import { OAuthSuccessResponse } from '@betnomi/libs/types/auth/oauth';
import { TelegramUser, AuthErrorTransformResult, AuthState } from '../../types/store/auth';
import { AuthActionTypes } from './actionsTypes';
import { OAuthLoginFormikValues } from '../../hooks/formik/useOAuthLoginFormik';

export const authReady = () => ({ type: AuthActionTypes.Ready });

export const authSetState = (payload: Partial<AuthState>) => ({
  type: AuthActionTypes.SetState,
  payload,
});

export const authSetTokens = (access: string, refresh: string, game: string) => ({
  type: AuthActionTypes.SetTokens,
  payload: { access, refresh, game },
});

export const authSetLogin = (payload: Partial<AuthState['login']>) => ({
  type: AuthActionTypes.SetLogin,
  payload,
});

export const authSetSignUp = (payload: Partial<AuthState['signUp']>) => ({
  type: AuthActionTypes.SetSignUp,
  payload,
});

export const authLogin = (
  payload: {
    username: string;
    password: string;
  },
  callback: (error?: AuthErrorTransformResult) => void,
) => ({
  type: AuthActionTypes.Login,
  payload: { values: payload, callback },
});

export const authLoginWithMetamask = (callback: (error?: AuthErrorTransformResult) => void) => ({
  type: AuthActionTypes.LoginMetamask,
  payload: { callback },
});

export const authLoginTelegram = (
  payload: TelegramUser,
  callback: (error?: AuthErrorTransformResult) => void,
) => ({
  type: AuthActionTypes.LoginTelegram,
  payload: { telegram: payload, callback },
});

export const authSignUp = (payload: {
  email: string;
  username: string;
  password: string;
  referralCode: string;
},
callback: (error?: AuthErrorTransformResult) => void) => ({
  type: AuthActionTypes.SignUp,
  payload: { values: payload, callback },
});

export const authSignupTelegram = (
  payload: { login: string, referralCode?: string; },
  callback: (e?: string) => void,
) => ({
  type: AuthActionTypes.SignUpTelegram,
  payload: { values: payload, callback },
});

export const authSetTelegram = (payload: TelegramUser) => ({
  type: AuthActionTypes.AuthSetTelegram,
  payload,
});

export const authSignUpWithMetamask = (payload: {
  login: string
  referralCode?: string;
},
callback: (error?: string) => void) => ({
  type: AuthActionTypes.SignUpMetamask,
  payload: { values: payload, callback },
});

export const authLogout = (payload?: { reason?: string }) => ({
  type: AuthActionTypes.Logout,
  payload,
});

export const authSetUser = (payload: Partial<AuthState['user']>) => ({
  type: AuthActionTypes.SetUser,
  payload,
});

export const authSetOAuth = (payload: Partial<AuthState['oauth']>) => ({
  type: AuthActionTypes.SetOAuth,
  payload,
});

export const authSelectCurrency = (currency: CoinType) => ({
  type: AuthActionTypes.SelectCurrency,
  payload: { currency },
});

export const authSetRanks = (payload: Partial<AuthState['ranks']>) => ({
  type: AuthActionTypes.SetRanks,
  payload,
});

export const authSetUI = (payload: Partial<AuthState['ui']>) => ({
  type: AuthActionTypes.SetUI,
  payload,
});

export const authRestorePassword = (
  payload: { username: string },
  callback: (error?: AuthErrorTransformResult) => void,
) => ({
  type: AuthActionTypes.RestorePassword,
  payload: { values: payload, callback },
});

export const authRefresh = () => ({ type: AuthActionTypes.Refresh });
export const authOAuthLogin = (data: OAuthSuccessResponse) => ({
  type: AuthActionTypes.OAuthLogin,
  payload: {
    data,
  },
});

export const authOAuthSignup = (
  payload: OAuthLoginFormikValues,
  callback: (e?: string) => void,
) => ({
  type: AuthActionTypes.OAuthSignup,
  payload,
  callback,
});
