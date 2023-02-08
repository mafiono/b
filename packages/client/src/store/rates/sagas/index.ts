import { fork } from 'redux-saga/effects';
import { getRatesSaga } from './getRates';

export function* ratesSaga() {
  yield fork(getRatesSaga);
}
