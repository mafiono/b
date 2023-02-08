import { call, put, select } from 'redux-saga/effects';
import { selectProfileTransactionAll } from 'store/profile/selectors';
import { profileGetTransactionAll, profileSetTransactionAll } from '../../actionCreators';
import { transformBackendErrorToString } from '../../../../utils/api/transforms';
import { transactionsGetAll } from '../../api';
import { Unwrap } from '../../../../types/unwrap';
import { TransactionAllRequest } from '../../types';

export function* transactionAllSaga({
  payload,
}: ReturnType<typeof profileGetTransactionAll>) {
  try {
    yield put(profileSetTransactionAll({ isLoading: true }));
    const { toDate, fromDate } = yield select(selectProfileTransactionAll);

    const modifiedData: TransactionAllRequest = {
      toDate: Math.trunc(toDate / 1000),
      transactionTypes: [payload.transactionTypes.value],
      resultTypes: [payload.resultTypes.value],
      fromDate: Math.trunc(fromDate / 1000),
    };

    const { data }: Unwrap <typeof transactionsGetAll> = yield call(
      transactionsGetAll, modifiedData,
    );

    yield put(profileSetTransactionAll({
      total: data.total,
      list: data.list, 
    }));
  } catch (e) {
    console.log(transformBackendErrorToString(e));
  } finally {
    yield put(profileSetTransactionAll({ isLoading: false }));
  }
}
