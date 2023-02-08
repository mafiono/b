import { useEffect } from 'react';
import { useShallowSelector } from './index';
import { selectAuth } from '../store/auth/selectors';

export const useOnLogout = (callback: () => void) => {
  const { access, refresh } = useShallowSelector(selectAuth);

  useEffect(() => {
    if (!access && !refresh) {
      callback();
    }
  }, [access, refresh]);
};
