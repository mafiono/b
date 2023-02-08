import { storiesOf } from '@storybook/react';
import React from 'react';
import { useFakeCoinNames } from '@betnomi/libs/hooks/storybook/useFakeCoinNames';
import {
  boolean, number, select, text, 
} from '@storybook/addon-knobs';
import { values } from 'ramda';
import { CoinType } from '@betnomi/libs/types';
import { action } from '@storybook/addon-actions';
import { WalletWithdrawSecurityConfirmation } from './index';

storiesOf('Withdraw', module).add('WalletWithdrawSecurityConfirmation', () => {
  const names = useFakeCoinNames();
  const coin = select('Selected', names, values(names)[0]) as CoinType;
  const amount = number('Amount', 0);
  const email = text('Email', 'sor2131aasd@betnomi.com');
  const emailCode = text('Email Code', '');
  const googleCode = text('Google Code', '');
  const address = text('Address', '0x535B23df493dcBc23C4dfA49fB1F45dS05w44354');
  const fee = number('Fee', 0);
  const onChangeEmailCode = action('onChangeEmailCode');
  const onChangeGoogleCode = action('onChangeGoogleCode');
  const onSubmit = action('onSubmit');
  const onRequestCode = action('onRequestCode');
  const onClose = action('onClose');
  const isLoading = boolean('isLoading', false);

  return (
    <WalletWithdrawSecurityConfirmation
      coin={coin}
      amount={amount}
      fee={fee}
      email={email}
      emailCode={emailCode}
      googleCode={googleCode}
      address={address}
      onChangeEmailCode={onChangeEmailCode}
      onChangeGoogleCode={onChangeGoogleCode}
      onSubmit={onSubmit}
      onRequestCode={onRequestCode}
      onClose={onClose}
      isLoading={isLoading}
    />
  );
});
