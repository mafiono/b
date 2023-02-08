import createReducer from '@betnomi/libs/utils/createReducer';
import { HomeState } from '../../types/store/home';
import { homeHandlers } from './handlers';

const initialState: HomeState = {
  games: {
    isLoading: true,
    categories: [],
    trending: [],
    slots: [],
    promotions: [],
    liveCasino: [],
    gameProviders: [],
  },
};

export default createReducer(initialState, homeHandlers);
