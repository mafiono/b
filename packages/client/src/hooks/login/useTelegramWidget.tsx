import React from 'react';
import { TelegramUser } from '../../types/store/auth';

declare global {
  interface Window {
    TelegramLoginWidget: {
      dataOnauth: (user: TelegramUser) => void
    }
    telegram: boolean;
  }
}

export const useTelegramWidget = (
  ref: React.RefObject<HTMLButtonElement>,
  dataOnauth: (user: TelegramUser) => void,
) => {
  if (ref.current === null) return;

  window.TelegramLoginWidget = {
    dataOnauth: (user: TelegramUser) => dataOnauth(user),
  };

  const script = document.createElement('script');
  script.src = 'https://telegram.org/js/telegram-widget.js?15';
  script.setAttribute('data-telegram-login', process.env.REACT_APP_TELEGRAM_LOGIN_BOT || '');
  script.setAttribute('data-size', 'large');
  script.setAttribute('data-request-access', 'write');
  script.setAttribute('data-onauth', 'TelegramLoginWidget.dataOnauth(user)');
  script.setAttribute('data-userpic', 'false');
  script.async = true;
  ref.current.appendChild(script);
};
