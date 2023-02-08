import { useCallback } from 'react';
import { useOpenPopup } from '../useOpenPopup';

export const useOpenOAuthPopUp = (pathname: string) => {
  const openPopup = useOpenPopup();

  return useCallback(() => {
    if (!process.env.REACT_APP_API_URL) {
      throw new Error(
        'Define REACT_APP_API_URL',
      );
    }

    const url = new URL(process.env.REACT_APP_API_URL);
    url.pathname = pathname;

    openPopup(url.toString());
  }, [pathname, openPopup]);
};
