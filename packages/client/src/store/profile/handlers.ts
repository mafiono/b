import { ActionFn } from '@betnomi/libs/types/redux';
import { assocPath } from 'ramda';
import { ProfileActionTypes } from './actionTypes';
import { ProfileState } from '../../types/store/profile';
import {
  profileSetAdvanced,
  profileSetBasic, 
  profileSetIntermediate,
  profileSetTransactionAll,
  profileSetWithdraw,
  profileSetSportsBet, 
} from './actionCreators';

type ProfileHandlerFn<F extends (...args: any[]) => any> = ActionFn<ProfileState, ReturnType<F>>;

const setBasic: ProfileHandlerFn<typeof profileSetBasic> = (
  state,
  { payload },
) => assocPath(['basic'], { ...state.basic, ...payload }, state);

const setIntermediate: ProfileHandlerFn<typeof profileSetIntermediate> = (
  state,
  { payload },
) => assocPath(['intermediate'], { ...state.intermediate, ...payload }, state);

const setAdvanced: ProfileHandlerFn<typeof profileSetAdvanced> = (
  state,
  { payload },
) => assocPath(['advanced'], { ...state.advanced, ...payload }, state);

const setTransactionAll: ProfileHandlerFn<typeof profileSetTransactionAll> = (
  state,
  { payload },
) => assocPath(['transactionAll'], { ...state.transactionAll, ...payload }, state); 

const setWithdraw: ProfileHandlerFn<typeof profileSetWithdraw> = (
  state,
  { payload },
) => assocPath(['withdraw'], { ...state.withdraw, ...payload }, state);

const setSportsBet: ProfileHandlerFn<typeof profileSetSportsBet> = (
  state,
  { payload },
) => assocPath(['sportsBet'], { ...state.sportsBet, ...payload }, state); 

export const profileHandlers = {
  [ProfileActionTypes.SetBasic]: setBasic,
  [ProfileActionTypes.SetIntermediate]: setIntermediate,
  [ProfileActionTypes.SetAdvanced]: setAdvanced,
  [ProfileActionTypes.SetTransactionAll]: setTransactionAll,
  [ProfileActionTypes.SetWithdraw]: setWithdraw,
  [ProfileActionTypes.SetSportsBet]: setSportsBet,
};
