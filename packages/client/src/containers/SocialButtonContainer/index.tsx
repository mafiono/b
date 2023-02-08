import React from 'react';
import { OAuthType } from '@betnomi/libs/types/auth/oauth';
import { TelegramButton } from 'containers/TelegramButton';
import { useMetamaskLogin } from '../../hooks/ethereum/useMetamaskLogin';
import { SocialButton } from '../../components/auth/SocialButton';
import { SocialRegisterButtons } from '../../types/store/auth';
import { useGoogleLogin } from '../../hooks/login/useGoogleLogin';
import { useFacebookLogin } from '../../hooks/login/useFacebookLogin';
import styles from './styles.module.scss';

type Props = {
  signin?: boolean;
};

export const SocialButtonContainer: React.FC<Props> = ({ signin }) => {
  const type = signin ? OAuthType.SignIn : OAuthType.SignUp;
  const loginWithMetamask = useMetamaskLogin(type);
  const loginWithGoogle = useGoogleLogin();
  const loginWithFacebook = useFacebookLogin();

  return (
    <div className={styles.out}>
      <SocialButton typeButton={SocialRegisterButtons.Google} onClick={loginWithGoogle} />
      <SocialButton typeButton={SocialRegisterButtons.Facebook} onClick={loginWithFacebook} />
      <TelegramButton signin={signin} />
      <SocialButton typeButton={SocialRegisterButtons.Metamask} onClick={loginWithMetamask} />
    </div>
  );
};
