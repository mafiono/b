import { call, put, select } from 'redux-saga/effects';
import { hideToast, showErrorToast } from '@betnomi/libs/components/Toaster';
import { CoinType } from '@betnomi/libs/types';
import { profileSetWithdraw, profileWithdraw, profileWithdrawConfirm } from '../../actionCreators';
import { transformBackendErrorToString } from '../../../../utils/api/transforms';
import { WithdrawRequest } from '../../types';
import { profilePostWithdraw } from '../../api';
import { transformCoinToNomipayCurrency } from '../../transforms';
import { Unwrap } from '../../../../types/unwrap';
import { selectProfileWithdraw } from '../../selectors';
import { modalShow } from '../../../modal/actionCreators';
import { ModalType } from '../../../modal/types';

function* postWithdraw(payload: {
  coin: CoinType,
  amount: number,
  address: string,
  googleCode?: string,
  emailCode?: string,
}) {
  const data: WithdrawRequest = {
    currency: transformCoinToNomipayCurrency(payload.coin),
    amount: payload.amount,
    wallet: payload.address,
    googleCode: payload.googleCode || '',
    emailCode: payload.emailCode || '',
  };

  yield call(profilePostWithdraw, data);
}

export function* walletWithdrawSaga({
  payload,
  callback,
}: ReturnType<typeof profileWithdraw>) {
  // TODO: fetch it from backend
  const email = 'test_email_22@betnomi.me';

  try {
    yield call(postWithdraw, {
      coin: payload.network || payload.coin,
      amount: payload.amount || 0,
      address: payload.address,
    });

    callback();
    yield put(modalShow(ModalType.WithdrawalSuccess));
  } catch (e) {
    if (e?.response?.data?.message === 'token required') {
      // Show confirmation modal

      yield put(
        profileSetWithdraw({
          fee: payload.fee,
          amount: payload.amount,
          coin: payload.coin,
          address: payload.network || payload.coin,
          email,
        }),
      );

      yield put(modalShow(ModalType.WithdrawalConfirm));
      callback();

      return;
    }

    callback(transformBackendErrorToString(e));
  }
}

export function* walletConfirmWithdrawSaga({
  payload,
  callback,
}: ReturnType<typeof profileWithdrawConfirm>) {
  try {
    const {
      coin,
      amount,
      address,
    }: Unwrap<typeof selectProfileWithdraw> = yield select(
      selectProfileWithdraw,
    );

    yield call(postWithdraw, {
      coin, amount, address, googleCode: payload.googleCode, emailCode: payload.emailCode,
    });

    callback();
    yield put(modalShow(ModalType.WithdrawalSuccess));
  } catch (e) {
    callback({ message: transformBackendErrorToString(e) });
  }
}

export function walletWithdrawRequestCodeSaga() {
  hideToast();
  showErrorToast('You should implement it first', 'Code not sent');
}
