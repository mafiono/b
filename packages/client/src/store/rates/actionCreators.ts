import { RatesState } from '../../types/store/rates';
import { RatesActionTypes } from './actionTypes';

export const ratesSetState = (payload: Partial<RatesState>) => ({
  type: RatesActionTypes.SetState,
  payload,
});

export const ratesSetRates = (payload: Partial<RatesState['rates']>) => ({
  type: RatesActionTypes.SetRates,
  payload,
});
