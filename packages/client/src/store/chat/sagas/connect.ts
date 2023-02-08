import {
  centrifugeActionWithSuffix,
  centrifugeConnected,
  centrifugeDisconnected,
} from '@betnomi/libs/store/net/centrifuge';
import { CentrifugeActionTypes } from '@betnomi/libs/types/store/centrifuge';
import { put } from 'redux-saga/effects';
import { CentrifugeSuffixes } from '../../../constants/centrifuge';
import { chatSetState } from '../actionCreators';

export function* chatConnectedSaga({
  suffix,
  type,
}:
| ReturnType<typeof centrifugeConnected>
| ReturnType<typeof centrifugeDisconnected>) {
  if (suffix !== CentrifugeSuffixes.Chat) {
    return;
  }

  const isConnected =
    type ===
    centrifugeActionWithSuffix(
      CentrifugeActionTypes.Connected,
      CentrifugeSuffixes.Chat,
    );

  yield put(chatSetState({ isConnected, isHistoryLoaded: false }));
}
