import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number, select } from '@storybook/addon-knobs';
import { CoinType } from '@betnomi/libs/types';
import { TransactionAllTable } from './index';
import { TransactionAllStatus, TransactionAllType } from '../../../constants/transaction';

storiesOf('Profile', module).add('TransactionAllTable', () => {
  const amount = number('amount', 1.002);
  const createdAt = text('createdAt', '1628046125');
  const id = text('id', '179');
  const transactionType = select('transactionType', TransactionAllType, TransactionAllType.Win);
  const resultType = select('resultType', TransactionAllStatus, TransactionAllStatus.Completed);
  const product = text('product', 'game 10');
  const finalAmount = number('finalAmount', 5.9983);
  const currency = select('currency', CoinType, CoinType.bitcoin);

  const item = {
    amount,
    createdAt,
    currency,
    finalAmount,
    id,
    product,
    resultType,
    transactionType,
  };

  return (
    <TransactionAllTable
      list={[item]}
    />
  );
});
