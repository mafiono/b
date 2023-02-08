import React from 'react';
import { storiesOf } from '@storybook/react';
import { values } from 'ramda';
import { CoinType } from '@betnomi/libs/types';
import { useFakeCoinNames } from '@betnomi/libs/hooks/storybook/useFakeCoinNames';
import {
  number, select, text, boolean, 
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { useFakeBalances } from '@betnomi/libs/hooks/storybook/useFakeBalances';
import { ChatRainForm } from './index';

storiesOf('Chat', module).add('ChatRainForm', () => {
  const names = useFakeCoinNames();
  const balances = useFakeBalances();
  const coin = select('Selected', names, values(names)[0]) as CoinType;
  const amount = number('Amount', 0);
  const message = text('Message', 'Sample text');
  const min = number('Min', 0);
  const persons = number('Persons', 0);
  const isLoading = boolean('Loading', false);
  const onTouch = action('onTouch');
  const onSubmit = action('onSubmit');
  const onChangeCoin = action('onSelect');
  const onChangeAmount = action('onChangeAmount');
  const onChangeMessage = action('onChangeMessage');
  const onChangePersons = action('onChangePersons');
  const errors = {
    amount: text('Amount error', ''),
    persons: text('Persons error', ''),
    message: text('Message error', ''),
  };
  const touched = {
    amount: true,
    persons: true,
    message: true,
  };

  return (
    <div style={{ width: 368 }}>
      <ChatRainForm
        coin={coin}
        balances={balances}
        amount={amount || 0}
        message={message}
        min={min || 0}
        persons={persons || 0}
        touched={touched}
        errors={errors}
        isLoading={isLoading}
        onTouchAmount={onTouch}
        onTouchPersons={onTouch}
        onTouchMessage={onTouch}
        onSubmit={onSubmit}
        onChangeCoin={onChangeCoin}
        onChangeAmount={onChangeAmount}
        onChangeMessage={onChangeMessage}
        onChangePersons={onChangePersons}
      />
    </div>
  );
});
