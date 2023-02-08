import { CoinType } from '@betnomi/libs/types';
import { BetType, BetResult } from '../../constants/BetResult';
import { TransactionAllStatus, TransactionAllType } from '../../constants/transaction';
import { WithdrawConfirmValues } from '../../hooks/formik/useWithdrawConfirmFormik';

export interface ProfileKYCCreateRequest {
  firstName: string;
  lastName: string;
  birthDay: string;
  gender: string;
  address: string;
  city: string;
  country: string;
  region: string;
  zipCode: string;
}

export type WithdrawErrorTransformResult = {
  message: string;
  fields?: { [key in keyof WithdrawConfirmValues]?: string };
};

export interface WithdrawRequest {
  currency: string;
  wallet: string;
  amount: number;
  emailCode: string;
  googleCode: string;
}

export enum KYCFileType {
  ProofOfAddress = 'proofOfAddress',
  SourceOfFunds = 'sourceOfFunds',
  ProofOfIdentityBack = 'proofOfIdentityBack',
  ProofOfIdentityFront = 'proofOfIdentityFront',
}

export interface KYCFileUploadResponse {
  userId: string;
  filePath: string;
}

export type TransactionAllItem = {
  amount: number;
  createdAt: string;
  currency: CoinType;
  finalAmount: number;
  id: string;
  product: string;
  resultType: TransactionAllStatus;
  transactionType: TransactionAllType;
};

export type TransactionAllList = TransactionAllItem[] | undefined;

export type TransactionAllResponse = {
  total: number;
  list: TransactionAllList;  
};

export type TransactionAllRequest = {
  toDate: number;
  fromDate?: number;
  transactionTypes: TransactionAllType[];
  resultTypes: TransactionAllStatus[];
};

export type SportsBetItem = {
  amount: number;
  createdAt: string;
  currency: CoinType;
  finalAmount: number;
  id: string;
  product: string;
  resultType: BetResult;
  transactionType: BetType;
};

export type SportsBetList = SportsBetItem[] | undefined;
