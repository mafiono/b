import { pick } from 'ramda';
import { State } from '../../types/store';

export const selectAuth = (state: State) => state.auth;
export const selectAuthUser = (state: State) => state.auth.user;
export const selectAuthUserBalances = (state: State) => state.auth.user.balances;
export const selectAuthTokens = (state: State) =>
  pick(['access', 'refresh', 'game'], state.auth);
export const selectAuthRanksList = (state: State) => state.auth.ranks.list;
export const selectAuthRanksMy = (state: State) => state.auth.ranks.my;
export const selectAuthUI = (state: State) => state.auth.ui;
export const selectAuthLogin = (state: State) => state.auth.login;
export const selectAuthSignUp = (state:State) => state.auth.signUp;
export const selectAuthOAuth = (state:State) => state.auth.oauth;
export const selectAuthTelegram = (state:State) => state.auth.telegram;
