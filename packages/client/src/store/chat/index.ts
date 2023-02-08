import createReducer from '@betnomi/libs/utils/createReducer';
import { values } from 'ramda';
import { CentrifugeMessage } from '@betnomi/libs/types/chat';
import { ChatState } from '../../types/store/chat';
import { chatHandlers } from './handlers';
import { ChatRoom } from './constants';

// const MOCK_LIMIT_COUNT = 10000;
//
// const mockMessages: (room: ChatRoom) => CentrifugeMessage[] = (room) =>
//   [...new Array(MOCK_LIMIT_COUNT)].map((_, i) => ({
//     id: i.toString(),
//     room,
//     sender_nickname: `sample ${i}`,
//     text: `Sample text ${i}`,
//     file_name: '',
//     created_at: +new Date(),
//   }));

const messages = values(ChatRoom).reduce(
  (acc, room) => ({ ...acc, [room]: [] }),
  {} as Record<ChatRoom, CentrifugeMessage[]>,
);

export const chatInitialState: ChatState = {
  isConnected: false,
  isSending: false,
  messages,
  participants: 1,
  room: ChatRoom.English,
  isHistoryLoaded: false,
};

export default createReducer(chatInitialState, chatHandlers);
