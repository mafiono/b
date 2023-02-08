import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import {
  boolean, number, select, text, 
} from '@storybook/addon-knobs';
import { CoinType } from '@betnomi/libs/types';
import { keys } from 'ramda';
import image from '@betnomi/libs/assets/img/profile/avatar.png';
import { useFakeCoins } from '@betnomi/libs/hooks/storybook/useFakeCoins';
import { useFakeLevels } from '@betnomi/libs/hooks/storybook/useFakeLevels';
import { useFakeBalances } from '@betnomi/libs/hooks/storybook/useFakeBalances';
import { HeaderUser } from './index';

storiesOf('Layout', module).add('HeaderUser', () => {
  const coins = useFakeCoins();
  const levels = useFakeLevels();
  const balances = useFakeBalances();
  const rates = useFakeBalances();
  const viewInUSD = boolean('ViewInUSD', true);
  const onChatToggle = action('onChatToggle');
  const chatActive = boolean('chatActive', false);
  const onNotificationToggle = action('onNotificationToggle');
  const notificaionActive = boolean('notificaionActive', false);
  const selectedCoin = select<CoinType>('selectedCoin', coins, keys(coins)[0]);
  const onChangeCoin = action('onChangeCoin');
  const onDepositClick = action('onDepositClick');
  const onSettingsClick = action('onSettingsClick');
  const level = select('Level', levels, keys(levels)[1]);
  const name = text('Name', 'ermalength');
  const progress = number('Progress %', 75);
  const confirmed = boolean('Confirmed%', true);
  const onLogout = action('Logout');
  const onSetViewInUSD = action('onViewInUSD');
  const isMobile = boolean('isMobile', false);

  return (
    <HeaderUser
      onChatToggle={onChatToggle}
      chatActive={chatActive}
      onNotificationToggle={onNotificationToggle}
      notificationActive={notificaionActive}
      onChangeCoin={onChangeCoin}
      selectedCoin={selectedCoin}
      balances={balances}
      rates={rates}
      name={name}
      progress={progress}
      confirmed={confirmed}
      image={image}
      level={level}
      onLogout={onLogout}
      onSettingsClick={onSettingsClick}
      onDepositClick={onDepositClick}
      viewInUSD={viewInUSD}
      setViewInUSD={onSetViewInUSD}
      isMobile={isMobile}
    />
  );
});
