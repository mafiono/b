import { takeLeading } from 'redux-saga/effects';
import { ProfileActionTypes } from '../actionTypes';
import { profileGetBasicSaga, profileSubmitBasicSaga } from './basic';
import {
  profileGetAdvancedSaga,
  profileGetIntermediateSaga,
  profileUploadAdvancedSaga,
  profileUploadIntermediateSaga,
} from './advanced';

import { transactionAllSaga } from './transaction/transactionAll';
import { walletConfirmWithdrawSaga, walletWithdrawRequestCodeSaga, walletWithdrawSaga } from './wallet/withdraw';
import { sportbetsSaga } from './sportbets';

export default function* profileSaga() {
  yield takeLeading(ProfileActionTypes.GetBasic, profileGetBasicSaga);
  yield takeLeading(ProfileActionTypes.SubmitBasic, profileSubmitBasicSaga);
  yield takeLeading(ProfileActionTypes.UploadIntermediate, profileUploadIntermediateSaga);
  yield takeLeading(ProfileActionTypes.UploadAdvanced, profileUploadAdvancedSaga);
  yield takeLeading(ProfileActionTypes.GetAdvanced, profileGetAdvancedSaga);
  yield takeLeading(ProfileActionTypes.GetIntermediate, profileGetIntermediateSaga);
  yield takeLeading(ProfileActionTypes.Withdraw, walletWithdrawSaga);
  yield takeLeading(ProfileActionTypes.GetTransactionAll, transactionAllSaga);
  yield takeLeading(ProfileActionTypes.WithdrawConfirm, walletConfirmWithdrawSaga);
  yield takeLeading(ProfileActionTypes.WithdrawRequestCode, walletWithdrawRequestCodeSaga);
  yield takeLeading(ProfileActionTypes.GetSportsBet, sportbetsSaga);
}
