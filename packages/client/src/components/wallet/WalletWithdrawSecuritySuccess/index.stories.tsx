import { storiesOf } from '@storybook/react';
import React from 'react';
import { useFakeCoinNames } from '@betnomi/libs/hooks/storybook/useFakeCoinNames';
import { number, select, text } from '@storybook/addon-knobs';
import { values } from 'ramda';
import { CoinType } from '@betnomi/libs/types';
import { action } from '@storybook/addon-actions';
import { WalletWithdrawSecuritySuccess } from './index';

storiesOf('Withdraw', module).add('WalletWithdrawSecuritySuccess', () => {
  const names = useFakeCoinNames();
  const coin = select('Selected', names, values(names)[0]) as CoinType;
  const amount = number('Amount', 0);
  const address = text('Address', '0x535B23df493dcBc23C4dfA49fB1F45dS05w44354');
  const fee = number('Fee', 0);
  const onClose = action('onClose');

  return (
    <WalletWithdrawSecuritySuccess
      coin={coin}
      amount={amount}
      fee={fee}
      address={address}
      onClose={onClose}
    />
  );
});
