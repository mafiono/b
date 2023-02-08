import {
  select, take, delay, call, race, put,
} from 'redux-saga/effects';
import { selectAuthUI } from '../../auth/selectors';
import { AuthActionTypes } from '../../auth/actionsTypes';
import { chatGetParticipants } from '../api';
import { selectChat } from '../selectors';
import { ChatActionTypes } from '../actionTypes';
import { Unwrap } from '../../../types/unwrap';
import { chatSetState } from '../actionCreators';

const POLL_INTERVAL = 30000;

export function* pollChatParticipantsSaga() {
  while (true) {
    const { isChatActive }: ReturnType<typeof selectAuthUI> = yield select(
      selectAuthUI,
    );
    const { isConnected }: ReturnType<typeof selectChat> = yield select(
      selectChat,
    );

    if (!isConnected) {
      yield take(ChatActionTypes.SetState);
    } else if (!isChatActive) {
      yield take(AuthActionTypes.SetUI);
    } else {
      try {
        const { data }: Unwrap<typeof chatGetParticipants> = yield call(
          chatGetParticipants,
          0,
          0,
        );
        yield put(chatSetState({ participants: parseInt(data.total, 10) || 1 }));
      } catch (e) {
        // TODO: don't handle it
      }

      yield race([take(AuthActionTypes.SetUI), delay(POLL_INTERVAL)]);
    }
  }
}
