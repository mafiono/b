import { fork } from 'redux-saga/effects';
import authSaga from './auth/sagas';
import chatSaga from './chat/sagas';
import homeSaga from './home/sagas';
import { ratesSaga } from './rates/sagas';
import profileSaga from './profile/sagas';

export default function* rootSaga() {
  yield fork(authSaga);
  yield fork(chatSaga);
  yield fork(homeSaga);
  yield fork(ratesSaga);
  yield fork(profileSaga);
}
