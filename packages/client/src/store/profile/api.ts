import { api } from '../../utils/api';
import { ApiPaths } from '../../utils/api/constants';
import {
  KYCFileUploadResponse,
  ProfileKYCCreateRequest,
  WithdrawRequest,
  TransactionAllRequest, 
  TransactionAllResponse, 
} from './types';
import { ProfileFileState } from '../../types/store/profile';

export const profileKYCCreate = (data: ProfileKYCCreateRequest) =>
  api.post(ApiPaths.KYCCreate, data);

export const profileKYCUpdate = (data: ProfileKYCCreateRequest) =>
  api.post(ApiPaths.KYCUpdate, data);

export const profileGetKYC = () =>
  api.get<ProfileKYCCreateRequest>(ApiPaths.KYC);

export const profilePostWithdraw = (data: WithdrawRequest) =>
  api.post<void>(ApiPaths.Withdraw, data);

export const profileUploadProofOfAddress = (file: string) =>
  api.post<KYCFileUploadResponse>(ApiPaths.KYCProofOfAddress, { file });

export const profileUploadSourceOfFunds = (file: string) =>
  api.post<KYCFileUploadResponse>(ApiPaths.KYCSourceOfFunds, { file });

export const profileUploadIdentityBack = (file: string) =>
  api.post<KYCFileUploadResponse>(ApiPaths.KYCIdentityBack, { file });

export const profileUploadIdentityFront = (file: string) =>
  api.post<KYCFileUploadResponse>(ApiPaths.KYCIdentityFront, { file });

export const profileGetProofOfAddress = () =>
  api.get<ProfileFileState>(ApiPaths.KYCProofOfAddress);

export const profileGetSourceOfFunds = () =>
  api.get<ProfileFileState>(ApiPaths.KYCSourceOfFunds);

export const profileGetIdentityBack = () =>
  api.get<ProfileFileState>(ApiPaths.KYCIdentityBack);

export const profileGetIdentityFront = () =>
  api.get<ProfileFileState>(ApiPaths.KYCIdentityFront);

export const transactionsGetAll = (data: TransactionAllRequest) => 
  api.post<TransactionAllResponse>(ApiPaths.TransactionAll, data);
