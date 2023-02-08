import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, select, text, 
} from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';
import { values } from 'ramda';
import { CoinType } from '@betnomi/libs/types';
import { useFakeCoins } from '@betnomi/libs/hooks/storybook/useFakeCoins';
import { WalletWithdrawForm } from './index';
import { withdrawPairs } from '../../../constants/withdraw';

storiesOf('Withdraw', module).add('WalletWithdrawForm', () => {
  const names = useFakeCoins();
  const coin = select('Selected', names, values(names)[0]) as CoinType;
  const pairs = withdrawPairs[coin]?.reduce((acc, item) => ({ ...acc, [item]: item }), {}) || {};
  const targetCoin = select('Network', pairs, undefined as any) as CoinType;
  const balance = number('balance', 0);
  const limit = number('limit', 0);
  const limitLeft = number('limitLeft', 0);
  const total = number('total', 0);
  const fee = number('fee', 0);
  const amount = number('amount', undefined as any);
  const isLoading = boolean('isLoading', false);
  
  const errors = {
    amount: text('Amount error', ''),
    address: text('Address error', ''),
  };
  const touched = {
    amount: true,
    address: true,
  };
  
  const address = text('Address', '');

  const onChangeCoin = action('onChangeCoin');
  const onChangeAddress = action('onChangeAddress');
  const onChangeAmount = action('onChangeAmount');
  const onTouchAddress = action('onTouchAddress');
  const onChangeNetwork = action('onChangeNetwork');
  const onSubmit = action('onSubmit');

  return (
    <div style={{ width: 400 }}>
      <WalletWithdrawForm
        coin={coin}
        targetCoin={targetCoin}
        balance={balance}
        limit={limit}
        limitLeft={limitLeft}
        total={total}
        fee={fee}
        errors={errors}
        touched={touched}
        address={address}
        amount={amount}
        isLoading={isLoading}
        onChangeCoin={onChangeCoin}
        onChangeAddress={onChangeAddress}
        onChangeAmount={onChangeAmount}
        onTouchAddress={onTouchAddress}
        onChangeNetwork={onChangeNetwork}
        onSubmit={onSubmit}
      />
    </div>
  );
});
