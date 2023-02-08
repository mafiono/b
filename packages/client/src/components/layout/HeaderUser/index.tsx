import React, { FC, useCallback } from 'react';
import {FontIcon, FontIconName} from '@betnomi/libs/components/FontIcon';
import { CoinType } from '@betnomi/libs/types';
import { WalletSelect } from '@betnomi/libs/components/widgets/WalletSelect';
import { UserWidget, UserWidgetProps } from '@betnomi/libs/components/widgets/UserWidget';
import styles from './styles.module.scss';
import { HeaderToggleButton } from '../HeaderToggleButton';

export interface HeaderUserProps extends UserWidgetProps {
  onChatToggle: (val: boolean) => void;
  onNotificationToggle: (val: boolean) => void;
  chatActive: boolean;
  notificationActive: boolean;
  balances: Partial<Record<CoinType, number>>;
  rates: Partial<Record<CoinType, number>>;
  selectedCoin: CoinType;
  onChangeCoin: (val: CoinType) => void;
  onLogout: () => void;
  onDepositClick: () => void;
  onSettingsClick: () => void;
  viewInUSD: boolean
  setViewInUSD: (value: boolean) => void;
}

const HeaderUser: FC<HeaderUserProps> = ({
  chatActive,
  notificationActive,
  onChatToggle,
  onNotificationToggle,
  balances,
  rates,
  selectedCoin,
  onChangeCoin,
  name,
  confirmed,
  image,
  progress,
  level,
  onLogout,
  onDepositClick,
  onSettingsClick,
  viewInUSD,
  setViewInUSD,
  isMobile
}) => {
  const onChatClick = useCallback(() => onChatToggle(!chatActive), [
    chatActive,
    onChatToggle,
  ]);
  const onNotificationClick = useCallback(
    () => onNotificationToggle(!notificationActive),
    [notificationActive, onNotificationToggle],
  );

  return (
    <div className={styles.buttons}>
      <div className={styles.wallet}>
        <WalletSelect
          rates={rates}
          balances={balances}
          selected={selectedCoin}
          onChange={onChangeCoin}
          onDepositClick={onDepositClick}
          onSettingsClick={onSettingsClick}
          viewInUSD={viewInUSD}
          setViewInUSD={setViewInUSD}
        />
      </div>

      {!isMobile && (
          <HeaderToggleButton
              active={chatActive}
              onClick={onChatClick}
              icon={FontIconName.Chat}
          />
      )}

      <HeaderToggleButton
        active={notificationActive}
        onClick={onNotificationClick}
        icon={FontIconName.Notify}
      />

      <div className={styles.user}>
        <UserWidget
          level={level}
          name={name}
          progress={progress}
          image={image}
          confirmed={confirmed}
          onLogout={onLogout}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
};

export { HeaderUser };
