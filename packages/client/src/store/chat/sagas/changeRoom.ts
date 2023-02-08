import { put, select, take } from 'redux-saga/effects';
import {
  centrifugeActionWithSuffix,
  centrifugeHistory,
  centrifugeSubscribe,
  centrifugeUnsubscribe,
} from '@betnomi/libs/store/net/centrifuge';
import { CentrifugeActionTypes } from '@betnomi/libs/types/store/centrifuge';
import {
  chatChangeRoom,
  chatSetMessages,
  chatSetState,
} from '../actionCreators';
import { selectChat, selectChatMessages } from '../selectors';
import { CentrifugeSuffixes } from '../../../constants/centrifuge';

export function* chatChangeRoomSaga({
  payload: { room },
}: ReturnType<typeof chatChangeRoom>) {
  const {
    isConnected,
    room: currentRoom,
    isHistoryLoaded,
  }: ReturnType<typeof selectChat> = yield select(selectChat);

  // Do nothing, if channel not changed
  if (currentRoom === room && isHistoryLoaded) {
    return;
  }

  // Wait for connect
  if (!isConnected) {
    yield take(
      centrifugeActionWithSuffix(
        CentrifugeActionTypes.Connected,
        CentrifugeSuffixes.Chat,
      ),
    );
  }

  yield put(centrifugeUnsubscribe(CentrifugeSuffixes.Chat, currentRoom));
  yield put(chatSetState({ room, isHistoryLoaded: false }));
  yield put(centrifugeSubscribe(CentrifugeSuffixes.Chat, room));

  const history: ReturnType<typeof centrifugeHistory> = yield take(
    centrifugeActionWithSuffix(
      CentrifugeActionTypes.History,
      CentrifugeSuffixes.Chat,
    ),
  );

  const messages: ReturnType<typeof selectChatMessages> = yield select(
    selectChatMessages,
  );

  yield put(chatSetMessages({ ...messages, [room]: history.messages }));
  yield put(chatSetState({ isHistoryLoaded: true }));
}
