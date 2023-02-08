import React, { useCallback, useState,useEffect } from 'react';
import { FontIcon, FontIconName } from '@betnomi/libs/components/FontIcon';
import { Link } from '@betnomi/libs/components';
import styles from './styles.module.scss';
import { useTranslation } from '../../../i18n';
import { HeaderGuest } from '../HeaderGuest';
import { HeaderUser, HeaderUserProps } from '../HeaderUser';
import { Routes } from '../../../constants/routes';

import logo from '@betnomi/libs/assets/img/new-logo.svg';
import mobileLogo from '@betnomi/libs/assets/img/mobile_logo.svg';

type Props = HeaderUserProps & {
  isAuthorized: boolean;
  onChatToggle: (val: boolean) => void;
  onNotificationToggle: (val: boolean) => void;
  onMenuToggle: (val: boolean) => void;
  chatActive: boolean;
  notificationActive: boolean;
  menuActive: boolean;
  onLogout: () => void;
  onOpenSignInModal: () => void;
  onOpenSignUpModal: () => void;
  isMobile: boolean;
};

export const Header: React.FC<Props> = ({
  isAuthorized,
  onChatToggle,
  onMenuToggle,
  chatActive,
  notificationActive,
  menuActive,
  onNotificationToggle,
  balances,
  rates,
  selectedCoin,
  onChangeCoin,
  name,
  level,
  progress,
  image,
  confirmed,
  onLogout,
  onOpenSignUpModal,
  onOpenSignInModal,
  onSettingsClick,
  onDepositClick,
  viewInUSD,
  setViewInUSD,
  isMobile ,
}) => {
  const { t } = useTranslation();
  
  const [isSmallDesktop, setSmallDesktop] = useState(window.innerWidth < 1300 && window.innerWidth > 768)
  const onMenuClick = useCallback(() => onMenuToggle(!menuActive), [
    menuActive,
    onMenuToggle,
  ]);

  const onMenuDesktopClick = useCallback(() =>{
    if (chatActive) {
      onChatToggle(!chatActive)
      }
      onMenuToggle(!menuActive)

    //  onMenuToggle(!menuActive)
    }, [
    chatActive,
    menuActive,
    onChatToggle,
    onMenuToggle,
  ]);

  const updateMedia = () => {
    setSmallDesktop(window.innerWidth < 1300 && window.innerWidth > 768);
  };

  useEffect(() => {
    window.addEventListener("resize", updateMedia);
    return () => window.removeEventListener("resize", updateMedia);
  });
  const midScreen = window.matchMedia('(min-width:769px) and (max-width: 1250px)').matches;

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        {!isMobile && (
            <div
                className={styles.menu_toggle}
                onClick={isSmallDesktop?onMenuDesktopClick:onMenuClick}
                role="button"
                tabIndex={-1}
                onKeyPress={isSmallDesktop?onMenuDesktopClick:onMenuClick}
            >
              <FontIcon name={FontIconName.Menu} size={24} />
            </div>
        )}
        <Link to={Routes.Homepage}>
          <img src={(isAuthorized && isMobile || midScreen) ? mobileLogo : logo} alt="Betnomi" height={32} />
        </Link>
      </div>

      {!isMobile && (
          <div className={styles.links}>
            <Link to={Routes.Homepage}>{t('Home') }</Link>
            <Link to={Routes.Games}>{t('Games')}</Link>
            <Link to={Routes.InPlays}>{t('InPlays')}</Link>
            <Link to={Routes.Sports}>{t('Sports')}</Link>
            <Link to={Routes.Casino}>{t('Casino') }</Link>
            <Link to={Routes.LiveCasino}>{t('Live Casino') }</Link>
            <Link to={Routes.ESports}>{t('E-Sports') }</Link>
          </div>
      )}

      {isAuthorized ? (
        <HeaderUser
          onChatToggle={onChatToggle}
          chatActive={chatActive}
          notificationActive={notificationActive}
          onNotificationToggle={onNotificationToggle}
          balances={balances}
          rates={rates}
          selectedCoin={selectedCoin}
          onChangeCoin={onChangeCoin}
          level={level}
          name={name}
          progress={progress}
          image={image}
          confirmed={confirmed}
          onLogout={onLogout}
          onDepositClick={onDepositClick}
          onSettingsClick={onSettingsClick}
          viewInUSD={viewInUSD}
          setViewInUSD={setViewInUSD}
          isMobile={isMobile}
        />
      ) : (
        <HeaderGuest
          onChatToggle={onChatToggle}
          active={chatActive} 
          onOpenSignInModal={onOpenSignInModal}
          onOpenSignUpModal={onOpenSignUpModal}
          isMobile={isMobile}
          isSmallDesktop={isSmallDesktop}
          onMenuToggle={onMenuToggle}
          menuActive={menuActive}
        />
      )}
    </header>
  );
};
