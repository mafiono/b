import { State } from '../../types/store';

export const selectHomeGames = (state: State) => state.home.games;
