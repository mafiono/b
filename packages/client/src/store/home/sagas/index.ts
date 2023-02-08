import { takeLeading } from 'redux-saga/effects';
import { HomeActionType } from '../actionTypes';
import { getGamesSaga } from './games';

export default function* homeSaga() {
  yield takeLeading(HomeActionType.GetGames, getGamesSaga);
}
