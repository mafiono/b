import { put } from 'redux-saga/effects';
// import { selectProfileTransactionAll, selectSportsBet } from 'store/profile/selectors';
import { transformBackendErrorToString } from '../../../utils/api/transforms';
import { profileGetSportsBet, profileSetSportsBet } from '../actionCreators';
// import { transactionsGetAll } from '../api';
// import { Unwrap } from '../../../types/unwrap';
// import { TransactionAllRequest } from '../types';

export function* sportbetsSaga({
  payload,
}: ReturnType<typeof profileGetSportsBet>) {
  try {
    yield put(profileSetSportsBet({ isLoading: true }));
    console.log('payload', payload);
    //  TODO WHEN READY BACK LOOK in transactionAll for example
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(profileSetSportsBet({ isLoading: false }));
  }
}
