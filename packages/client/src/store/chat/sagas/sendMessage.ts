import { call, put } from 'redux-saga/effects';
import { chatSendMessage, chatSetState } from '../actionCreators';
import { chatPostMessage } from '../api';

export function* chatSendMessageSaga({
  payload: { text, file_data, callback },
}: ReturnType<typeof chatSendMessage>) {
  try {
    yield put(chatSetState({ isSending: true }));
    yield call(chatPostMessage, text, file_data);
    callback();
  } catch (e) {
    callback(e.toString());
  } finally {
    yield put(chatSetState({ isSending: false }));
  }
}
