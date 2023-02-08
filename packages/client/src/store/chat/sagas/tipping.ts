import { call, put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { showSuccessToast } from '@betnomi/libs/components/Toaster';
import i18n from '@betnomi/libs/utils/i18n';
import { chatSendTip } from '../actionCreators';
import { chatPostTip } from '../api';
import { ChatTippingRequest } from '../types';
import { modalHide } from '../../modal/actionCreators';
import { BackendErrorResponse } from '../../../types/api';
import { chatTippingErrorToErrors } from '../../../utils/api/transforms';

export function* chatSendTipSaga({
  payload,
  callback,
}: ReturnType<typeof chatSendTip>) {
  try {
    const amount = payload.amount || 0;

    const request: ChatTippingRequest = {
      to_user_id: parseInt(payload.recipientValue, 10),
      to_user_email: '',
      currency: payload.coin,
      amount,
    };

    yield call(chatPostTip, request);
    callback();
    yield put(modalHide());

    showSuccessToast(
      i18n.t(
        "You've just tipped {{name}} with {{amount}} {{currency}}",
        {
          name: payload.recipientLabel,
          amount: payload.amount,
          currency: payload.coin, 
        },
      ),
      i18n.t('Success'),
    );
  } catch (e) {
    const error: AxiosError<BackendErrorResponse> = e;
    callback(chatTippingErrorToErrors(error.response?.data));
  }
}
