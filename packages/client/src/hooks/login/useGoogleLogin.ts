import { useCallback, useEffect } from 'react';
import { OAuthProvider, OAuthSuccessResponse } from '@betnomi/libs/types/auth/oauth';
import { useDispatch } from 'react-redux';
import { useOpenOAuthPopUp } from './useOpenOauthPopup';
import { ApiPaths } from '../../utils/api/constants';
import { authOAuthLogin } from '../../store/auth/actionCreators';

export const useGoogleLogin = () => {
  const dispatch = useDispatch();

  const onMessage = useCallback((event: MessageEvent) => {
    const data = event?.data as OAuthSuccessResponse;
    if (!data?.type || data?.payload?.provider !== OAuthProvider.Google) {
      return;
    }

    dispatch(authOAuthLogin(event.data));
  }, [dispatch]);

  useEffect(() => {
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onMessage]);

  return useOpenOAuthPopUp(ApiPaths.OAuth2Google);
};
