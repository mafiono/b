import { centrifugeMessage } from '@betnomi/libs/store/net/centrifuge';
import { put, select } from 'redux-saga/effects';
import { values } from 'ramda';
import { selectChat } from '../selectors';
import { ChatRoom } from '../constants';
import { chatSetMessages } from '../actionCreators';

export function* chatMessageSaga({ message: { data } }: ReturnType<typeof centrifugeMessage>) {
  const room = data?.room as ChatRoom;

  if (!data.room || !values(ChatRoom).includes(room)) {
    return;
  }

  const { messages }: ReturnType<typeof selectChat> = yield select(selectChat);

  const items = messages[room];

  yield put(chatSetMessages({ [room]: [...items, data] }));
}
