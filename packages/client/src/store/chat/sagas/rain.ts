import { call, put } from 'redux-saga/effects';
import { AxiosError } from 'axios';
import { showSuccessToast } from '@betnomi/libs/components/Toaster';
import i18n from '@betnomi/libs/utils/i18n';
import { chatSendRain } from '../actionCreators';
import { ChatRainRequest } from '../types';
import { chatPostRain } from '../api';
import { modalHide } from '../../modal/actionCreators';
import { BackendErrorResponse } from '../../../types/api';
import { chatRainErrorToErrors } from '../../../utils/api/transforms';

export function* chatSendRainSaga({ payload, callback }: ReturnType<typeof chatSendRain>) {
  try {
    const amount = payload.amount || 0;

    const request: ChatRainRequest = {
      to_users_count: payload.persons,
      currency: payload.coin,
      amount: amount.toString(),
      message: payload.message,
    };

    yield call(chatPostRain, request);
    callback();
    yield put(modalHide());
    showSuccessToast(
      i18n.t(
        "You've just rained {{amount}} {{currency}} to {{count}} users",
        {
          amount: payload.amount,
          currency: payload.coin,
          count: payload.persons,
        },
      ),
      i18n.t('Success'),
    );
  } catch (e) {
    const error: AxiosError<BackendErrorResponse> = e;
    callback(chatRainErrorToErrors(error.response?.data));
  }
}
