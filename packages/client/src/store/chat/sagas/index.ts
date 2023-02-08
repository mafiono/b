import {
  takeEvery, takeLatest, takeLeading, fork,
} from 'redux-saga/effects';
import { REHYDRATE } from 'redux-persist/es/constants';
import { CentrifugeActionTypes } from '@betnomi/libs/types/store/centrifuge';
import { centrifugeActionWithSuffix } from '@betnomi/libs/store/net/centrifuge';
import { chatRehydrateSaga } from './rehydrate';
import { AuthActionTypes } from '../../auth/actionsTypes';
import { chatConnectCentrifuge } from './guestToken';
import { chatConnectedSaga } from './connect';
import { CentrifugeSuffixes } from '../../../constants/centrifuge';
import { ChatActionTypes } from '../actionTypes';
import { chatSendMessageSaga } from './sendMessage';
import { chatMessageSaga } from './message';
import { chatChangeRoomSaga } from './changeRoom';
import { chatSendTipSaga } from './tipping';
import { chatSendRainSaga } from './rain';
import { pollChatParticipantsSaga } from './pollParticipants';

const connectAction = centrifugeActionWithSuffix(
  CentrifugeActionTypes.Connected,
  CentrifugeSuffixes.Chat,
);

const disconnectAction = centrifugeActionWithSuffix(
  CentrifugeActionTypes.Disconnected,
  CentrifugeSuffixes.Chat,
);

const messageAction = centrifugeActionWithSuffix(
  CentrifugeActionTypes.Message,
  CentrifugeSuffixes.Chat,
);

export default function* chatSaga() {
  yield takeEvery(REHYDRATE, chatRehydrateSaga);
  yield takeEvery([connectAction, disconnectAction], chatConnectedSaga);
  yield takeEvery(messageAction, chatMessageSaga);

  yield takeLeading(ChatActionTypes.SendMessage, chatSendMessageSaga);
  yield takeEvery(
    AuthActionTypes.SetTokens,
    chatConnectCentrifuge,
  );
  yield takeLatest(ChatActionTypes.ChangeRoom, chatChangeRoomSaga);
  yield takeLeading(ChatActionTypes.SendTip, chatSendTipSaga);
  yield takeLeading(ChatActionTypes.SendRain, chatSendRainSaga);
  yield fork(pollChatParticipantsSaga);
}
