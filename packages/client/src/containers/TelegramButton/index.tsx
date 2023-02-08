import React, { useRef, useEffect } from 'react';
import { OAuthType } from '@betnomi/libs/types/auth/oauth';
import { useTelegramLogin } from 'hooks/login/useTelegramLogin';
import { SocialButton } from '../../components/auth/SocialButton';
import { SocialRegisterButtons } from '../../types/store/auth';
import { useTelegramWidget } from '../../hooks/login/useTelegramWidget';
import styles from './styles.module.scss';

type Props = {
  signin?: boolean;
};

export const TelegramButton: React.FC<Props> = ({ signin }) => {
  const type = signin ? OAuthType.SignIn : OAuthType.SignUp;
  const loginWithTelegram = useTelegramLogin(type);
  const ref = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    useTelegramWidget(ref, loginWithTelegram);
  }, [signin]);

  return (
    <div className={styles.telegram}>
      <SocialButton innerRef={ref} typeButton={SocialRegisterButtons.Telegram} />
    </div>
  );
};
