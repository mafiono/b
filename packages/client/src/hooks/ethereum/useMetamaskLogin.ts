import { showSuccessToast } from '@betnomi/libs/components/Toaster';
import { useDispatch } from 'react-redux';
import { authLoginWithMetamask } from 'store/auth/actionCreators';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useCallback } from 'react';
import { useModal } from 'hooks/useModal';
import { ModalType } from 'store/modal/types';
import { OAuthType } from '@betnomi/libs/types/auth/oauth';
import { useWeb3 } from './useWeb3';
import { AuthErrorTransformResult } from '../../types/store/auth';

export const useMetamaskLogin = (type: OAuthType) => {
  const { connect } = useWeb3();
  const dispatch = useDispatch();
  const { showErrorToast, hideToast } = useToasts();
  const { t } = useTranslation('main');
  const { showModal } = useModal();

  const callback = (e?: AuthErrorTransformResult) => {
    if (e && e.message) {
      hideToast();
      showErrorToast(t(e.message), t('Warning'));
      return; 
    }
    showSuccessToast('', t('Welcome'));
  };
  
  const loginWithMetamask = useCallback(
    () => connect()
      .then(() => dispatch(authLoginWithMetamask(callback)))
      .catch((e) => callback(e)),
    [connect],
  );

  const signUpWithMetamsk = useCallback(
    () => connect()
      .then(() => showModal(ModalType.SignUpMetamask)())
      .catch((e) => callback(e)), 
    [connect],
  );

  return type === OAuthType.SignIn ? loginWithMetamask : signUpWithMetamsk;
};
