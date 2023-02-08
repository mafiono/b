import { OAuthProvider, OAuthSuccessResponse } from '@betnomi/libs/types/auth/oauth';
import { useDispatch } from 'react-redux';
import { useCallback, useEffect } from 'react';
import { ApiPaths } from '../../utils/api/constants';
import { useOpenOAuthPopUp } from './useOpenOauthPopup';
import { authOAuthLogin } from '../../store/auth/actionCreators';

export const useFacebookLogin = () => {
  const dispatch = useDispatch();

  const onMessage = useCallback((event: MessageEvent) => {
    const data = event?.data as OAuthSuccessResponse;
    if (!data?.type || data?.payload?.provider !== OAuthProvider.Facebook) {
      return;
    }

    dispatch(authOAuthLogin(event.data));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onMessage]);

  return useOpenOAuthPopUp(ApiPaths.OAuth2Facebook);
};
