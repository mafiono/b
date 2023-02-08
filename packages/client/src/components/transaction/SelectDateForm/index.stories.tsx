import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { SelectDateForm } from './index';

storiesOf('Profile', module).add('SelectDateForm', () => {
  const onSubmit = action('onSubmit');
  const fromDate = text('fromDate', '2021/08/03');
  const toDate = text('toDate', '2021/08/04');
  
  return (
    <SelectDateForm
      onSubmit={onSubmit}
      fromDate={fromDate}
      toDate={toDate}
    />
  );
});
