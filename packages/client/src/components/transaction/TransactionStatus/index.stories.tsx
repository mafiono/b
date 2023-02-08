import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { TransactionStatus } from './index';
import { TransactionAllStatus } from '../../../constants/transaction';

storiesOf('Profile', module).add('TransactionStatus', () => {
  const type = select('Label', TransactionAllStatus, TransactionAllStatus.Completed);

  return (
    <TransactionStatus
      type={type}
      label={type}
    />
  );
});
