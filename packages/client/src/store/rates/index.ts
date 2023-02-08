import createReducer from '@betnomi/libs/utils/createReducer';
import { emptyBalances } from '@betnomi/libs/types';
import { ratesHandlers } from './handlers';
import { RatesState } from '../../types/store/rates';

export const ratesInitialState: RatesState = {
  lastLoadedAt: undefined,
  rates: emptyBalances,
};

export default createReducer(ratesInitialState, ratesHandlers);
