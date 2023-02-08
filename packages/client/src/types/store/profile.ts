import { FileStatus } from '@betnomi/libs/constants/fileStatus';
import { CoinType } from '@betnomi/libs/types';
import { ProfileKYCBasicFormikValues } from '../../hooks/formik/useProfileKYCBasicForm';
import { KYCFileType, TransactionAllList, SportsBetList } from '../../store/profile/types';

interface BasicState extends ProfileKYCBasicFormikValues {
  isLoaded: boolean
}

export interface ProfileFileState {
  name: string,
  contentType: string,
  fileSize: string,
  status: FileStatus
}

export interface ProfileState {
  basic: BasicState
  advanced: {
    isLoaded: boolean,
    isLoading: boolean,
    [KYCFileType.SourceOfFunds]: ProfileFileState,
    [KYCFileType.ProofOfAddress]: ProfileFileState,
  },
  intermediate: {
    isLoaded: boolean,
    isLoading: boolean,
    [KYCFileType.ProofOfIdentityFront]: ProfileFileState,
    [KYCFileType.ProofOfIdentityBack]: ProfileFileState,
  },
  withdraw: {
    isLoading: boolean;
    coin: CoinType;
    amount: number;
    fee: number;
    address: string;
    email: string;
  }
  transactionAll: {
    isLoading: boolean,
    total: number,
    list: TransactionAllList,
    fromDate?: number,
    toDate?: number,
  }
  sportsBet: {
    isLoading: boolean,
    total: number,
    list: SportsBetList,
    fromDate?: number,
    toDate?: number,
  }
}

export interface ProfileKYCBasicError {
  message: string
  fields?: { [key in keyof ProfileKYCBasicFormikValues]?: string }
}

export interface ProfileKYCAdvancedError {
  message?: string
  fields?: { [key in KYCFileType]?: string }
}
