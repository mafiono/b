import { CoinType } from '@betnomi/libs/types';
import { PlayerLevel } from '@betnomi/libs/types/casino/levels';

export interface AuthLoginResponse {
  access: string;
  refresh: string;
  game: string;
  playCurrency: CoinType;
}

export interface AuthMetamaskPreSignedResponse {
  walletAddress: string;
  nonce: string;
}

export interface AuthSignUpResponse {}

export interface AuthRefreshResponse {
  access: string;
  refresh: string;
  game: string;
}

export interface AuthMeResponse {
  userId: string;
  login: string;
  email: string;
  bcCurrency: string;
  playCurrency: string;
  playBonusId: string;
  isEmailVerified: true;
}

export interface AuthRanksResponse {
  list: {
    id: string;
    level: string;
    wager: string;
    name: PlayerLevel;
    reward: string;
    cashback_bonus: {
      percentage: 0;
      duration: string;
      expiration: string;
      wager_requirement: 0;
      minimum_loss: string;
      maximim_loss: string;
    };
  }[];
}

export interface AuthMyAffiliatesResponse {
  userId: string;
  rankId: string;
  rankGivenAt: string;
  affiliatePlanId: string;
  affiliatePlanAssignedAt: string;
  affiliatePlanAssignedBy: string;
  referrerId: string;
  totalBet: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthAffiliateGetAccountsResponse {
  list: {
    userId: string;
    currency: CoinType;
    number: string;
    balance: string;
    createdAt: string;
    updatedAt: string;
  }[];
}

export interface AuthOAuthSignupRequest {
  login: string;
  referrerID?: string;
  referrerLogin?: string;
  referralCode?: string;
}
