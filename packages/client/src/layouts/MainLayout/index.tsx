import React, {FC, useCallback, useEffect, useState} from 'react';
import cx from 'classnames';
import { CoinType } from '@betnomi/libs/types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ShowMore } from '../../components/home/ShowMore';
import { Chat } from '../../containers/chat/Chat';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/home/Footer';
import { Menu } from '../../components/layout/Menu';
import { MobileMenu } from '../../components/layout/MobileMenu';
import { useUser } from '../../hooks/useUser';
import { useShallowSelector } from '../../hooks';
import { selectAuth } from '../../store/auth/selectors';
import { authLogout, authSelectCurrency } from '../../store/auth/actionCreators';
import { ModalType } from '../../store/modal/types';
import { modalShow } from '../../store/modal/actionCreators';
import styles from './styles.module.scss';
import { useUserUI } from '../../hooks/useUserUI';
import { useRates } from '../../hooks/money/useRates';
import { Routes } from '../../constants/routes';

interface IProps {
  isMobile?: boolean
}

const MainLayout: FC<IProps> = ({ children , isMobile = false}) => {
  const dispatch = useDispatch();

  const {
    isChatActive, isMenuActive, setIsMenuActive, setIsChatActive,
  } = useUserUI();
  const [isNotificationActive, setIsNotificationActive] = useState(false);
  const {
    isAuthorized,
    progress,
    name,
    level,
    confirmed,
    image,
    balances,
    setViewInUSD,
    viewInUSD,
  } = useUser();
  const { currency } = useShallowSelector(selectAuth);

  const onChangeCoin = useCallback(
    (coin: CoinType) => dispatch(authSelectCurrency(coin)),
    [],
  );

  const onLogout = useCallback(() => dispatch(authLogout()), []);

  const onOpenSignInModal = useCallback(() => dispatch(modalShow(
    ModalType.SignIn,
  )), [dispatch]);

  const onOpenSignUpModal = useCallback(() => dispatch(modalShow(
    ModalType.SignUp,
  )), [dispatch]);

  const { rates } = useRates();
  const { push } = useHistory();
  const onDepositClick = useCallback(() => {
    push(`${Routes.Profile}/wallet/deposit`);
  }, [push]);

  useEffect(() => {
    if(typeof isMobile === 'boolean' && isMobile){
        setIsMenuActive(false)
    }else {
      setIsMenuActive(true)
    }
  }, [isMobile])

  return (
    <div
      className={cx(
        styles.container,
        { [styles.chat_active]: isChatActive },
        { [styles.menu_active]: isMenuActive },
      )}
    >
      <div className={styles.header}>
        <Header
          isAuthorized={isAuthorized}
          menuActive={isMenuActive}
          chatActive={isChatActive}
          notificationActive={isNotificationActive}
          onMenuToggle={setIsMenuActive}
          onChatToggle={setIsChatActive}
          onNotificationToggle={setIsNotificationActive}
          onChangeCoin={onChangeCoin}
          balances={balances}
          rates={rates}
          selectedCoin={currency}
          image={image}
          progress={progress}
          name={name}
          confirmed={confirmed}
          level={level}
          onLogout={onLogout}
          onOpenSignInModal={onOpenSignInModal}
          onOpenSignUpModal={onOpenSignUpModal}
          onDepositClick={onDepositClick}
          onSettingsClick={console.log}
          setViewInUSD={setViewInUSD}
          viewInUSD={viewInUSD}
          isMobile={isMobile}
        />
      </div>

      <div className={cx(styles.left, { [styles.active]: isMenuActive })}>
        <Menu
            onMenuToggle={setIsMenuActive}
            menuActive={isMenuActive}
            isMobile={isMobile}
        />
      </div>

      {isMobile && (
          <MobileMenu
              onMenuToggle={setIsMenuActive}
              menuActive={isMenuActive}
              chatActive={isChatActive}
              onChatToggle={setIsChatActive}
          />
      )}


      <div className={cx(styles.right, { [styles.active]: isChatActive })}>
        <Chat onChatToggle={setIsChatActive} active={isChatActive} />
      </div>

      <div className={styles.content}>
        {children}

        <div className={styles.footer}>
          <ShowMore />
          <Footer isMobile={isMobile} rates={rates}/>
        </div>
      </div>
    </div>
  );
};

export { MainLayout };
