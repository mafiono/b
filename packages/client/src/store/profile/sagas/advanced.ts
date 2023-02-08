import { all, call, put } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { FileStatus } from '@betnomi/libs/constants/fileStatus';
import {
  profileSetAdvanced,
  profileSetIntermediate,
  profileUploadAdvanced,
  profileUploadIntermediate,
} from '../actionCreators';
import { KYCFileType } from '../types';
import { transformBackendErrorToString } from '../../../utils/api/transforms';
import {
  profileGetIdentityBack,
  profileGetIdentityFront,
  profileGetProofOfAddress,
  profileGetSourceOfFunds,
  profileUploadIdentityBack,
  profileUploadIdentityFront,
  profileUploadProofOfAddress,
  profileUploadSourceOfFunds,
} from '../api';
import { KYCFile } from '../../../components/profile/ProfileKYCFileUploadForm';
import { Unwrap } from '../../../types/unwrap';
import { ProfileFileState } from '../../../types/store/profile';

function* getKYCFile(type: KYCFileType) {
  let result: AxiosResponse<ProfileFileState>;

  switch (type) {
    case KYCFileType.ProofOfAddress:
      result = (yield call(profileGetProofOfAddress)) as Unwrap<typeof profileGetProofOfAddress>;
      yield put(profileSetAdvanced({ [KYCFileType.ProofOfAddress]: result.data }));
      break;
    case KYCFileType.SourceOfFunds:
      result = (yield call(profileGetSourceOfFunds)) as Unwrap<typeof profileGetSourceOfFunds>;
      yield put(profileSetAdvanced({ [KYCFileType.SourceOfFunds]: result.data }));
      break;
    case KYCFileType.ProofOfIdentityFront:
      result = (yield call(profileGetIdentityFront)) as Unwrap<typeof profileGetIdentityFront>;
      yield put(profileSetIntermediate({ [KYCFileType.ProofOfIdentityFront]: result.data }));
      break;
    case KYCFileType.ProofOfIdentityBack:
      result = (yield call(profileGetIdentityBack)) as Unwrap<typeof profileGetIdentityBack>;
      yield put(profileSetIntermediate({ [KYCFileType.ProofOfIdentityBack]: result.data }));
      break;
    default:
  }
}

function* uploadFileAndGetStatus(file: KYCFile) {
  if (!file.value || file.status !== FileStatus.New) {
    return;
  }

  switch (file.kycFileType) {
    case KYCFileType.ProofOfAddress:
      yield call(profileUploadProofOfAddress, file.value);
      break;
    case KYCFileType.SourceOfFunds:
      yield call(profileUploadSourceOfFunds, file.value);
      break;
    case KYCFileType.ProofOfIdentityFront:
      yield call(profileUploadIdentityFront, file.value);
      break;
    case KYCFileType.ProofOfIdentityBack:
      yield call(profileUploadIdentityBack, file.value);
      break;
    default:
      throw new Error('Unknown file type');
  }

  yield call(getKYCFile, file.kycFileType);
}

export function* profileUploadAdvancedSaga({
  payload,
  callback,
}: ReturnType<typeof profileUploadAdvanced>) {
  yield put(profileSetAdvanced({ isLoading: true }));

  for (let i = 0; i < payload.files.length; i += 1) {
    try {
      yield call(uploadFileAndGetStatus, payload.files[i]);
    } catch (e) {
      callback({
        fields: { [payload.files[i].kycFileType]: transformBackendErrorToString(e) },
      });
    }
  }

  yield put(profileSetAdvanced({ isLoading: false }));
}

export function* profileUploadIntermediateSaga({
  payload,
  callback,
}: ReturnType<typeof profileUploadIntermediate>) {
  yield put(profileSetIntermediate({ isLoading: true }));

  for (let i = 0; i < payload.files.length; i += 1) {
    try {
      yield call(uploadFileAndGetStatus, payload.files[i]);
    } catch (e) {
      callback({
        fields: { [payload.files[i].kycFileType]: transformBackendErrorToString(e) },
      });
    }
  }

  yield put(profileSetIntermediate({ isLoading: false }));
}

export function* profileGetAdvancedSaga() {
  try {
    yield put(profileSetAdvanced({ isLoaded: false, isLoading: true }));
    yield all([
      call(getKYCFile, KYCFileType.SourceOfFunds),
      call(getKYCFile, KYCFileType.ProofOfAddress),
    ]);
  } catch (e) {
    // okay.
  } finally {
    yield put(profileSetAdvanced({ isLoading: false, isLoaded: true }));
  }
}

export function* profileGetIntermediateSaga() {
  try {
    yield put(profileSetIntermediate({ isLoaded: false, isLoading: true }));
    yield all([
      call(getKYCFile, KYCFileType.ProofOfIdentityBack),
      call(getKYCFile, KYCFileType.ProofOfIdentityFront),
    ]);
  } catch (e) {
    // okay.
  } finally {
    yield put(profileSetIntermediate({ isLoading: false, isLoaded: true }));
  }
}
