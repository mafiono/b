import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, text } from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import { RadioButton } from './index';

storiesOf('Basic', module).add('RadioButton', () => {
  const checked = boolean('Checked', true);
  const onCheck = action('onCheck');
  const label = text('Label', 'Sample checkbox');
  const hasError = boolean('Error', true);
  const disabled = boolean('Disabled', false);

  return (
    <RadioButton 
      checked={checked}
      onCheck={onCheck} 
      hasError={hasError}
      disabled={disabled}
    >
      {label}
    </RadioButton>
  );
});
