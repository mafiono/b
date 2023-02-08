import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, select, text, 
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { CoinType } from '@betnomi/libs/types';
import { keys } from 'ramda';
import image from '@betnomi/libs/assets/img/profile/avatar.png';
import { useFakeBalances } from '@betnomi/libs/hooks/storybook/useFakeBalances';
import { useFakeCoins } from '@betnomi/libs/hooks/storybook/useFakeCoins';
import { useFakeLevels } from '@betnomi/libs/hooks/storybook/useFakeLevels';
import { Header } from './index';

storiesOf('Layout', module).add('Header', () => {
  const balances = useFakeBalances();
  const rates = useFakeBalances();
  const coins = useFakeCoins();
  const levels = useFakeLevels();

  const isAuthorized = boolean('Authorized', false);
  const menuActive = boolean('MenuActive', false);
  const chatActive = boolean('ChatActive', false);
  const notificationActive = boolean('notificationActive', false);
  const viewInUSD = boolean('ViewInUSD', true);
  const onMenuToggle = action('onMenuToggle');
  const onChatToggle = action('onChatToggle');
  const onNotificationToggle = action('onNotificationToggle');
  const selectedCoin = select<CoinType>('selectedCoin', coins, keys(coins)[0]);
  const onChangeCoin = action('onChangeCoin');
  const level = select('Level', levels, keys(levels)[1]);
  const name = text('Name', 'ermalength');
  const progress = number('Progress %', 75);
  const confirmed = boolean('Confirmed%', true);
  const onLogout = action('logout');
  const onOpenSignInModal = action('onOpenSignInModal');
  const onOpenSignUpModal = action('onOpenSignUpModal');
  const onDepositClick = action('onDepositClick');
  const onSettingsClick = action('onSettingsClick');
  const onSetViewInUSD = action('onSetViewInUSD');
  const isMobile = boolean('isMobile', false);

  return (
    <div style={{ height: 80, width: '100%' }}>
      <Header
        isAuthorized={isAuthorized}
        menuActive={menuActive}
        chatActive={chatActive}
        notificationActive={notificationActive}
        onNotificationToggle={onNotificationToggle}
        onMenuToggle={onMenuToggle}
        onChatToggle={onChatToggle}
        balances={balances}
        selectedCoin={selectedCoin}
        onChangeCoin={onChangeCoin}
        level={level}
        image={image}
        name={name}
        rates={rates}
        progress={progress}
        confirmed={confirmed}
        onLogout={onLogout}
        onOpenSignInModal={onOpenSignInModal}
        onOpenSignUpModal={onOpenSignUpModal}
        onDepositClick={onDepositClick}
        onSettingsClick={onSettingsClick}
        viewInUSD={viewInUSD}
        setViewInUSD={onSetViewInUSD}
        isMobile={isMobile}
      />
    </div>
  );
});
