import { ActionFn } from '@betnomi/libs/types/redux';
import { assocPath } from 'ramda';
import { HomeState } from '../../types/store/home';
import { homeSetGames } from './actionCreators';
import { HomeActionType } from './actionTypes';

type HomeHandlerFn<F extends (...args: any[]) => any> = ActionFn<HomeState, ReturnType<F>>;

const setGames: HomeHandlerFn<typeof homeSetGames> = (
  state,
  { payload },
) => assocPath(['games'], { ...state.games, ...payload }, state);

export const homeHandlers = {
  [HomeActionType.SetGames]: setGames,
};
