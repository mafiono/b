import { ActionFn } from '@betnomi/libs/types/redux';
import { RatesActionTypes } from './actionTypes';
import { ratesSetState } from './actionCreators';
import { RatesState } from '../../types/store/rates';

type RatesHandlerFn<F extends (...args: any[]) => any> = ActionFn<
RatesState,
ReturnType<F>
>;

const setState: RatesHandlerFn<typeof ratesSetState> = (
  state,
  { payload },
) => ({
  ...state,
  ...payload,
});

const setRates: RatesHandlerFn<typeof ratesSetState> = (
  state,
  { payload },
) => ({
  ...state,
  rates: { ...state.rates, ...payload },
});

export const ratesHandlers = {
  [RatesActionTypes.SetState]: setState,
  [RatesActionTypes.SetRates]: setRates,
};
