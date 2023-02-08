import { HomeState } from '../../types/store/home';
import { HomeActionType } from './actionTypes';

export const homeGetGames = () => ({
  type: HomeActionType.GetGames,
});

export const homeSetGames = (payload: Partial<HomeState['games']>) => ({
  type: HomeActionType.SetGames,
  payload,
});
