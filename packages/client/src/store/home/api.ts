import { betconstructApi } from '../../utils/betconstructApi';
import { BetconstructApiPath } from '../../utils/betconstructApi/constants';
import { HomeGamesResponse } from './types';

const getGames = (offset = 0, limit = 15, partner_id = 200) => (
  betconstructApi.get<HomeGamesResponse>(BetconstructApiPath.GetGames, {
    params: {
      partner_id, offset, limit,
    },
  })
);

export const homeGetTrendingGames = () => getGames(0);
export const homeGetSlotsGames = () => getGames(15, 30);
export const homeGetPromotionsGames = () => getGames(30, 45);
export const homeGetLiveCasinoGames = () => getGames(45, 60);
export const homeGetGameProviders = () => getGames(60, 75);
