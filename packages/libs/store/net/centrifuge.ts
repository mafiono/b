import { ChatRoom } from '@betnomi/client/src/store/chat/constants';
import { CentrifugeActionTypes } from '../../types/store/centrifuge';
import { CentrifugeMessage } from '../../types/chat';

export const centrifugeActionWithSuffix = (
  action: CentrifugeActionTypes,
  suffix: string,
) => `${action}${suffix}`;

export const connectToCentrifuge = (
  suffix: string = '',
  token: string = '',
) => ({
  type: centrifugeActionWithSuffix(CentrifugeActionTypes.Connect, suffix),
  payload: { token },
});

export const disconnectCentrifuge = (suffix: string = '') => ({
  type: centrifugeActionWithSuffix(
    CentrifugeActionTypes.Disconnect,
    suffix,
  ),
});

export const centrifugeDisconnected = (suffix: string = '', ctx: any) => ({
  type: centrifugeActionWithSuffix(
    CentrifugeActionTypes.Disconnected,
    suffix,
  ),
  ctx,
  suffix,
});

export const centrifugeConnected = (suffix: string = '', ctx: any) => ({
  type: centrifugeActionWithSuffix(
    CentrifugeActionTypes.Connected,
    suffix,
  ),
  ctx,
  suffix,
});

export const centrifugeMessage = (suffix: string = '', message: { data: CentrifugeMessage }) => ({
  type: centrifugeActionWithSuffix(CentrifugeActionTypes.Message, suffix),
  message,
  suffix,
});

export const centrifugeSubscribe = (suffix: string = '', room: ChatRoom) => ({
  type: centrifugeActionWithSuffix(CentrifugeActionTypes.Subscribe, suffix),
  suffix,
  room,
});

export const centrifugeHistory = (suffix: string = '', messages: CentrifugeMessage[]) => ({
  type: centrifugeActionWithSuffix(CentrifugeActionTypes.History, suffix),
  suffix,
  messages,
});

export const centrifugeUnsubscribe = (suffix: string = '', room: ChatRoom) => ({
  type: centrifugeActionWithSuffix(CentrifugeActionTypes.Unsubscribe, suffix),
  suffix,
  room,
});

export const centrifugeSetToken = (suffix: string = '', token: string = '') => ({
  type: centrifugeActionWithSuffix(
    CentrifugeActionTypes.SetToken,
    suffix,
  ),
  token,
});
