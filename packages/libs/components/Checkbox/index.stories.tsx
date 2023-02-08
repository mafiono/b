import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { Checkbox } from './index';

storiesOf('Basic', module).add('Checkbox', () => {
  const checked = boolean('Checked', true);
  const onCheck = action('onCheck');
  const label = text('Label', 'Sample checkbox');

  return (
    <Checkbox checked={checked} onCheck={onCheck}>{label}</Checkbox>
  );
});
