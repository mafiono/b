import { GameType } from '../../../types/ui/games';
import slots from './slots.svg';
import trendingGames from './trendingGames.svg'; 
import liveCasino from './liveCasino.svg';

const gameIcons: Partial<Record<GameType, string>> = {
  [GameType.TrendingGames]: trendingGames,
  [GameType.Slots]: slots,
  [GameType.LiveCasino]: liveCasino,
};

export default gameIcons;
