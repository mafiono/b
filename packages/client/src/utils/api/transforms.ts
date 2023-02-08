import { keys } from 'ramda';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';
import { AxiosError } from 'axios';
import { AuthMyAffiliatesResponse, AuthRanksResponse } from '../../store/auth/types';
import {
  AffiliateRank,
  AffiliateStatus,
  AuthErrorTransformResult,
  SignInErrorReponse,
  SignUpErrorReponse,
} from '../../types/store/auth';
import { BackendErrorResponse } from '../../types/api';
import { ChatRainFormikValues } from '../../hooks/formik/useChatRainFormik';
import { ChatTippingFormikValues } from '../../hooks/formik/useChatTippingFormik';
import { backendBalancePrecision } from './constants';
import { ProfileKYCBasicError } from '../../types/store/profile';

export interface ChatRainCallbackErrors {
  message?: string;
  fields?: Partial<Record<keyof ChatRainFormikValues, string>>;
}

export interface ChatTippingCallbackErrors {
  message?: string;
  fields?: Partial<Record<keyof ChatTippingFormikValues, string>>;
}

export const affiliateResponseToStatus = (
  response: AuthMyAffiliatesResponse,
): AffiliateStatus =>
  keys(response).reduce(
    (acc, item) => ({
      ...acc,
      [item]: parseInt(response[item], 10),
    }),
    {} as AffiliateStatus,
  );

export const affiliateRanksToPlayerLevel = (
  response: AuthRanksResponse,
): Record<PlayerLevel, AffiliateRank> =>
  response.list.reduce(
    (acc, item) => ({
      ...acc,
      [item.name as PlayerLevel]: {
        ...item,
        id: parseInt(item.id, 10),
        level: parseInt(item.level, 10),
        wager: parseInt(item.wager, 10),
        reward: parseInt(item.reward, 10),
      },
    }),
    {} as Record<PlayerLevel, AffiliateRank>,
  );

export const signUpErrorResponseToError = (
  error: AxiosError<SignUpErrorReponse> | Error,
): AuthErrorTransformResult => {
  if (!(error as AxiosError<SignUpErrorReponse>)?.response?.data) {
    return { message: error.message, fields: {} };
  }

  const { data } = (error as AxiosError<SignUpErrorReponse>).response!;
  switch (data.code) {
    case 6: {
      return { message: data.message, fields: { email: data.message } };
    }
    case 3: {
      return {
        message: data.message,
        fields: { password: data.message },
      };
    }
    default:
      return {
        message: data.message || error.message,
        fields: {},
      };
  }
};

export const signInErrorResponseToError = (
  response: SignInErrorReponse,
): AuthErrorTransformResult => {
  switch (response.code) {
    case 2: {
      return {
        message: 'No linked metamask account found. Please, sign up using metamask first.',
        fields: { username: response.message },
      };
    }
    case 3: {
      return {
        message: response.message,
        fields: { password: response.message },
      };
    }
    default:
      return {
        message: response.message,
        fields: {
          password: response.message,
          username: response.message,
        },
      };
  }
};

export const signInTelegramErrorResponseToError = (
  response:SignInErrorReponse,
): AuthErrorTransformResult => {
  switch (response.code) {
    case 2: {
      return {
        message: 'No linked telegram account found. Please, sign up using telegram first.',
        fields: { username: response.message },
      };
    }
    default:
      return {
        message: response.message,
        fields: {
          password: response.message,
          username: response.message,
        },
      };
  }
};

export const chatRainErrorToErrors = (
  response?: BackendErrorResponse,
): ChatRainCallbackErrors => {
  switch (response?.code) {
    case 9:
      return {
        message: response.message,
        fields: { amount: response.message },
      };
    default:
      return { message: response?.message };
  }
};

export const chatTippingErrorToErrors = (
  response?: BackendErrorResponse,
): ChatTippingCallbackErrors => {
  switch (response?.code) {
    default:
      return { message: response?.message };
  }
};

export const profileBasicErrorToErrors = (
  response: BackendErrorResponse,
): ProfileKYCBasicError => {
  switch (response.code) {
    case 2:
      return {
        message: "You can't modify this settings now",
      };
    default:
      return {
        message: response?.message,
      };
  }
};

export const transformBalanceToFloat = (balance: string): number =>
  parseInt(balance, 10) / backendBalancePrecision;

export const transformFloatToBalance = (float: number): string =>
  (float * backendBalancePrecision).toString();

export const transformBackendErrorToString = (e: any) => {
  if (e?.response?.data?.message) {
    return e.response.data.message as string;
  }

  return e.message as string;
};
