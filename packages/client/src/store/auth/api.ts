import { CoinType } from '@betnomi/libs/types';
import { TelegramUser } from '../../types/store/auth';
import { api } from '../../utils/api';
import { ApiPaths } from '../../utils/api/constants';
import {
  AuthAffiliateGetAccountsResponse,
  AuthLoginResponse,
  AuthMeResponse,
  AuthMetamaskPreSignedResponse,
  AuthMyAffiliatesResponse,
  AuthOAuthSignupRequest,
  AuthRanksResponse,
  AuthRefreshResponse,
  AuthSignUpResponse,
} from './types';

export const authPostLogin = (
  email: string,
  password: string,
  device_id: string = '',
  device_name = '',
) =>
  api.post<AuthLoginResponse>(ApiPaths.AuthLogin, {
    email,
    password,
    device_id,
    device_name,
  });

export const authPostLoginMetamask = (
  walletAddress: string,
  signature: string,
  device_id = '',
  device_name = '',
) =>
  api.post<AuthLoginResponse>(ApiPaths.AuthLoginMetamask, {
    walletAddress,
    signature,
    device_id,
    device_name,
  });

export const authPutMetamaskPreSigned = (wallet_address: string = '') => 
  api.put<AuthMetamaskPreSignedResponse>(ApiPaths.AuthMetamaskPreSigned, {
    wallet_address,
  });

export const authPostLoginTelegram = (
  telegram: TelegramUser,
  device_id = '',
  device_name = '',
) =>
  api.post<AuthLoginResponse>(ApiPaths.AuthLoginTelegram, {
    telegram,
    device_id,
    device_name,
  });

let refresher: Promise<any> | undefined;

export const authRefresh = async (refresh: string, currency: CoinType) => {
  if (refresher) {
    return refresher;
  }
  
  refresher = api.post<AuthRefreshResponse>(
    ApiPaths.AuthRefresh,
    { play_currency: currency },
    {
      headers: { authorization: `Bearer ${refresh}` },
    },
  );

  const result = await refresher;
  refresher = undefined;
  return result;
};

export const authPostSignUp = (
  email: string,
  login: string,
  password: string,
  referralCode: string,
) =>
  api.post<AuthSignUpResponse>(ApiPaths.AuthSignUp, {
    email,
    password,
    login,
    referralCode,
  });

export const authPostSignUpMetamask = (
  wallet_address: string,
  signature: string,
  login: string,
  referralCode?: string,
) =>
  api.post<AuthSignUpResponse>(ApiPaths.AuthSignUpMetamask, {
    wallet_address,
    signature,
    login,
    referralCode,
  });

export const authPostSignUpTelegram = (
  telegram: TelegramUser,
  login: string,
  referrerId?: string,
  referrerLogin?: string,
  referralCode?: string,
) =>
  api.post<AuthSignUpResponse>(ApiPaths.AuthSignUpTelegram, {
    telegram,
    login,
    referrerId,
    referrerLogin,
    referralCode,
  });
  
export const authGetMe = () => api.get<AuthMeResponse>(ApiPaths.AuthGetMe);

export const authGetRanks = () =>
  api.get<AuthRanksResponse>(ApiPaths.AuthGetRanks);

export const authGetMyAffiliates = () =>
  api.get<AuthMyAffiliatesResponse>(ApiPaths.AuthGetMyAffiliates);

export const authGetBalances = () =>
  api.get<AuthAffiliateGetAccountsResponse>(ApiPaths.AffiliateGetAccounts);

export const authPostOAuthSignup = (params: AuthOAuthSignupRequest, token: string) =>
  api.post<AuthLoginResponse>(ApiPaths.OAuthSignup, params, { headers: { authorization: `Bearer ${token}` } });

export const authCheckLoginExists = (login: string) =>
  api
    .post<AuthLoginResponse>(ApiPaths.CheckLoginExists, { login })
    .then(() => false)
    .catch(() => true);
