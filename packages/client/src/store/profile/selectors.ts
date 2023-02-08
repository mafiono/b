import { State } from '../../types/store';

export const selectProfileBasic = (state: State) => state.profile.basic;
export const selectProfileIntermediate = (state: State) => state.profile.intermediate;
export const selectProfileAdvanced = (state: State) => state.profile.advanced;
export const selectProfileTransactionAll = (state: State) => state.profile.transactionAll;
export const selectProfileWithdraw = (state: State) => state.profile.withdraw;
export const selectSportsBet = (state: State) => state.profile.sportsBet;
