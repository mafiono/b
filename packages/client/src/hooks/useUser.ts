import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import useShallowSelector from './useShallowSelector';
import {
  selectAuth, selectAuthTokens, selectAuthUser, selectAuthUserBalances, 
} from '../store/auth/selectors';
import { usePlayerProgress } from './usePlayerProgress';
import { authSetState } from '../store/auth/actionCreators';

export const useUser = () => {
  const dispatch = useDispatch();
  const {
    name, confirmed, image, id, 
  } = useShallowSelector(
    selectAuthUser,
  );

  const { viewInUSD } = useShallowSelector(selectAuth);
  const balances = useShallowSelector(selectAuthUserBalances);
  const { access, refresh, game } = useShallowSelector(selectAuthTokens);
  const isLoggedIn = !!access && !!refresh;

  const { level, progress } = usePlayerProgress();
  
  const setViewInUSD = useCallback((value: boolean) => {
    dispatch(authSetState({ viewInUSD: value }));
  }, [dispatch]);

  return {
    name,
    level,
    progress,
    access,
    refresh,
    game,
    isAuthorized: isLoggedIn,
    confirmed,
    image,
    balances,
    id,
    viewInUSD,
    setViewInUSD,
  };
};
