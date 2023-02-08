import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, select, text,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { TransactionAllStatus, TransactionAllType, TimeRangeType } from '../../../constants/transaction';
import { TransactionAllForm } from './index';

storiesOf('Profile', module).add('TransactionAllForm', () => {
  const onSubmit = action('onSubmit');
  const onChangeType = action('onChangeType');
  const onTimeChange = action('onTimeChange');
  const onResultChange = action('onResultChange');
  const firstLabel = text('FirstLabel', 'Transaction Type');
  const secondLabel = text('SecondLabel', 'SecondLabel');
  const thirdLabel = text('ThirdLabel', 'Period of time');
  const buttonText = text('Submit', 'Submit');
  
  const loading = boolean('loading', false);
  const resultType = {
    label: select('resultType', TransactionAllStatus, TransactionAllStatus.Completed),
    value: select('resultType', TransactionAllStatus, TransactionAllStatus.Completed),
  };
  const transactionType = {
    label: select('transactionType', TransactionAllType, TransactionAllType.Win),
    value: select('transactionType', TransactionAllType, TransactionAllType.Win),
  };

  const time = {
    label: '24 hours',
    value: TimeRangeType.oneDay,
  };

  const optionsTransactionType = [
    { label: 'All', value: TransactionAllType.All },
    { label: 'Bet', value: TransactionAllType.Bet },
    { label: 'Bet and Win', value: TransactionAllType.BetAndWin },
    { label: 'Bonus', value: TransactionAllType.Bonus },
    { label: 'RollBack', value: TransactionAllType.Rollback },
    { label: 'Win', value: TransactionAllType.Win },
  ];
  
  const optionsResultType = [
    { label: 'All', value: TransactionAllStatus.AllResults },
    { label: 'Canceled', value: TransactionAllStatus.Canceled },
    { label: 'Completed', value: TransactionAllStatus.Completed },
    { label: 'Pending', value: TransactionAllStatus.Pending },
    { label: 'RollBack', value: TransactionAllStatus.RolledBack },
  ];

  const optionsTimeType = [
    { label: '24 hours', value: TimeRangeType.oneDay },
    { label: '48 hours', value: TimeRangeType.twoDay },
    { label: '72 hours', value: TimeRangeType.threeDay },
    { label: 'Customize', value: TimeRangeType.custom },
  ];

  return (
    <div style={{ minWidth: '1440px' }}>
      <TransactionAllForm
        onSubmit={onSubmit}
        onChangeType={onChangeType}
        onTimeChange={onTimeChange}
        onResultChange={onResultChange}
        loading={loading}
        resultType={resultType}
        transactionType={transactionType}
        time={time}
        timeOptions={optionsTimeType}
        resultOptions={optionsResultType}
        typeOptions={optionsTransactionType}
        firstLabel={firstLabel}
        secondLabel={secondLabel}
        thirdLabel={thirdLabel}
        buttonText={buttonText}
      />
    </div>
  );
});
