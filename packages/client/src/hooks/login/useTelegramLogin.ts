import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { OAuthType } from '@betnomi/libs/types/auth/oauth';
import { useModal } from 'hooks/useModal';
import { ModalType } from 'store/modal/types';
import { useToasts } from '@betnomi/libs/hooks/useToasts';
import { useTranslation } from '@betnomi/libs/utils/i18n';
import { showSuccessToast } from '@betnomi/libs/components/Toaster';
import { TelegramUser, AuthErrorTransformResult } from '../../types/store/auth';
import { authLoginTelegram, authSetTelegram } from '../../store/auth/actionCreators';

export const useTelegramLogin = (type: OAuthType) => {
  const dispatch = useDispatch();
  const { showModal } = useModal();
  const { t } = useTranslation();
  const { showErrorToast, hideToast } = useToasts();

  return useCallback((user:TelegramUser) => {
    const callback = (e?: AuthErrorTransformResult) => {
      if (e && e.message) {
        hideToast();
        showErrorToast(t(e.message), t('Warning'));
        return; 
      }
      showSuccessToast('', t('Welcome'));
    };
    
    if (user) {
      dispatch(authSetTelegram(user));
    }

    if (type === OAuthType.SignIn) {
      return dispatch(authLoginTelegram(user, callback));
    }
    
    return showModal(ModalType.SignUpTelegram)();
  }, [type]);
};
