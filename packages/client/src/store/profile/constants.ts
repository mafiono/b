import { FileStatus } from '@betnomi/libs/constants/fileStatus';
import { ProfileFileState } from '../../types/store/profile';

export const emptyProfileFileState: ProfileFileState = {
  name: '',
  contentType: '',
  fileSize: '',
  status: FileStatus.New,
};
