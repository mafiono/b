import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs/dist';
import { action } from '@storybook/addon-actions';
import DateRange from './index';

storiesOf('Basic', module).add('DateRange', () => {
  const beginValue = text('Begin value', '12/12/2021');
  const endValue = text('End value', '');
  const format = text('Date format', 'dd/MM/yyyy');
  const onBeginChange = action('onBeginChange');
  const onEndChange = action('onEndChange');

  return (
    <div style={{ width: 430 }}>
      <DateRange 
        onBeginChange={onBeginChange} 
        onEndChange={onEndChange} 
        dateFormat={format}
        beginValue={beginValue} 
        endValue={endValue}
      />
    </div>
  );
});
