import { put, call, all } from 'redux-saga/effects';
import { providers } from '@betnomi/libs/assets/img/providers';
import { homeSetGames } from '../actionCreators';
import {
  homeGetLiveCasinoGames, homeGetPromotionsGames, homeGetSlotsGames, homeGetTrendingGames,
} from '../api';
import { Unwrap } from '../../../types/unwrap';
import { Game } from '../types';

type GamesResponse = Unwrap<typeof homeGetTrendingGames>;

const gameProviders: Game[] = [...providers, ...providers].map<Game>((icon) => ({
  icon_2: icon,
  icon_3: icon,
  background: '',
  categories: [],
  id: String(Math.random()),
  front_game_id: String(Math.random()),
  description: '',
  blocked_currencies: [],
  name: '',
}));

export function* getGamesSaga() {
  try {
    yield put(homeSetGames({ isLoading: true }));
    
    const [trending, slots, promotions, liveCasino]: GamesResponse[] = 
      yield all([
        call(homeGetTrendingGames),
        call(homeGetSlotsGames),
        call(homeGetPromotionsGames),
        call(homeGetLiveCasinoGames),
      ]);
    
    yield put(homeSetGames({
      trending: trending.data.games,
      slots: slots.data.games,
      promotions: promotions.data.games,
      liveCasino: liveCasino.data.games,
      gameProviders,
    }));
  } finally {
    yield put(homeSetGames({ isLoading: false }));
  }
}
