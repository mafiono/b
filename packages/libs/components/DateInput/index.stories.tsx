import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs/dist';
import { action } from '@storybook/addon-actions';
import { DateInput } from './index';

storiesOf('Basic', module).add('DateInput', () => {
  const disabled = boolean('Disabled', false);
  const value = text('Value', '2021-12-12');
  const format = text('Format', 'yyyy-MM-dd');
  const onChange = action('onChange');

  return (
    <div style={{ width: 256 }}>
      <DateInput onChange={onChange} disabled={disabled} value={value} dateFormat={format} />
    </div>
  );
});
