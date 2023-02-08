import { CoinType } from '@betnomi/libs/types';
import { ProfileFileState } from '../../types/store/profile';
import { KYCFile } from '../../components/profile/ProfileKYCFileUploadForm';
import { KYCFileType } from './types';

export const transformCoinToNomipayCurrency = (coin: CoinType) => {
  switch (coin) {
    case CoinType.trc20:
      return 'USDT_TRX';
    case CoinType.erc20:
      return 'USDT';
    case CoinType.bep20:
      return 'USDT_BNB';
    default:
      return coin;
  }
};

export const transformProfileStateToKYCFile = (
  value: ProfileFileState,
  label: string,
  kycFileType: KYCFileType,
): KYCFile => ({
  label,
  status: value.status,
  value: '',
  name: value.name,
  size: parseInt(value.fileSize, 10) || 0,
  type: value.contentType,
  lastModified: 0,
  kycFileType,
});
