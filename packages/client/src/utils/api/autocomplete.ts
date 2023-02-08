import axios from 'axios';
import { api } from './index';
import { ApiPaths } from './constants';

export interface UserFindResponse {
  list: {
    userId: string,
    login: string,
    email: string,
    bcCurrency: string,
    playCurrency: string,
    playBonusId: string,
    isEmailVerified: boolean
  }[]
}
export const getAutocompleteUsers = (search: string) => {
  if (!search) {
    return;
  }

  const cancelTokenSource = axios.CancelToken.source();

  return {
    cancel: cancelTokenSource.cancel,
    request: api.get<UserFindResponse>(ApiPaths.UserFind, {
      params: { search },
      cancelToken: cancelTokenSource.token,
    }),
  };
};
