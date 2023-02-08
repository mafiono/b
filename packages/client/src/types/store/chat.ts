import { CentrifugeMessage } from '@betnomi/libs/types/chat';
import { ChatRoom } from '../../store/chat/constants';

export interface ChatState {
  isConnected: boolean;
  isSending: boolean;
  messages: Record<ChatRoom, CentrifugeMessage[]>
  participants: number;
  room: ChatRoom;
  isHistoryLoaded: boolean;
}
