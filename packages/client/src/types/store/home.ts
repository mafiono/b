import { GameCategory } from '@betnomi/libs/constants/gameCategory';
import { Game } from '../../store/home/types';

export interface HomeState {
  games: {
    isLoading: boolean;
    categories: GameCategory[];
    trending: Game[];
    slots: Game[];
    promotions: Game[];
    liveCasino: Game[];
    gameProviders: Game[];
  }
}
