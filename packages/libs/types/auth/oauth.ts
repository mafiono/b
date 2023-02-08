import { CoinType } from '../ui';

export enum OAuthProvider {
  Google = 'Google',
  Facebook = 'Facebook',
}

export enum OAuthType {
  SignIn = 'signin',
  SignUp = 'signup',
}

export interface OAuthSuccessResponse {
  type: string;
  payload: {
    provider: OAuthProvider;
    token: string;
    sign_up_temporary_token: string;
    session?: {
      access: string;
      refresh: string;
      game: string;
      play_currency: CoinType;
    };
    is_linked: boolean;
    app: string;
  };
}

export interface OAuthErrorResponse {
  type: string;
  payload: {
    provider: OAuthProvider;
    token: string;
    sign_up_temporary_token: string;
    is_linked: false;
    app: string;
    error: string;
  };
}
