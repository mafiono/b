import { MiddlewareAPI } from 'redux';
import { State } from '../types/store';
import { authRefresh } from './auth/api';
import { authSetTokens } from './auth/actionCreators';

export const refreshTokens = async (store: MiddlewareAPI<any, State>) => {
  const { refresh: token, currency } = store.getState().auth;
  const { data: { access, refresh, game } } = await authRefresh(token, currency);
  store.dispatch(authSetTokens(access, refresh, game));
  return access;
};
