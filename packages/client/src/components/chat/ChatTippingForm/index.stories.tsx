import React from 'react';
import { storiesOf } from '@storybook/react';
import { values } from 'ramda';
import { CoinType } from '@betnomi/libs/types';
import { useFakeCoinNames } from '@betnomi/libs/hooks/storybook/useFakeCoinNames';
import {
  boolean, number, select, text, 
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { useFakeBalances } from '@betnomi/libs/hooks/storybook/useFakeBalances';
import { ChatTippingForm } from './index';

storiesOf('Chat', module).add('ChatTippingForm', () => {
  const names = useFakeCoinNames();
  const coin = select('Selected', names, values(names)[0]) as CoinType;
  const amount = number('Amount', 0);
  const isPrivate = boolean('Private', true);
  const recipientLabel = text('Recipient Label', 'some@one.com');
  const recipientValue = text('Recipient Value', '15');
  const min = number('Min', 0);
  const balances = useFakeBalances();
  const onTouch = action('onTouch');
  const onSubmit = action('onSubmit');
  const onChangeCoin = action('onSelect');
  const onChangeAmount = action('onChangeAmount');
  const onChangePrivate = action('onChangePrivate');
  const onRecipientLabelChange = action('onRecipientLabelChange');
  const onRecipientValueChange = action('onRecipientValueChange');
  const errors = {
    amount: text('Amount error', ''),
    recipient: text('Recipient error', ''),
    coin: text('Coin error', ''),
  };
  const touched = {
    amount: true,
    recipient: true,
    coin: true,
  };

  return (
    <div style={{ width: 368 }}>
      <ChatTippingForm
        coin={coin}
        amount={amount || 0}
        min={min || 0}
        balance={balances[coin] || 0}
        recipientLabel={recipientLabel}
        recipientValue={recipientValue}
        isPrivate={isPrivate}
        touched={touched}
        errors={errors}
        onTouchAmount={onTouch}
        onTouchCoin={onTouch}
        onTouchRecipient={onTouch}
        onSubmit={onSubmit}
        onChangeAmount={onChangeAmount}
        onChangeCoin={onChangeCoin}
        onRecipientLabelChange={onRecipientLabelChange}
        onRecipientValueChange={onRecipientValueChange}
        onChangePrivate={onChangePrivate}
      />
    </div>
  );
});
