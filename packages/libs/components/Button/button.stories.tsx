import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import {
  boolean, number, radios, select, text, 
} from '@storybook/addon-knobs';
import Button from '.';
import { ButtonColor } from '../../types/ui';

storiesOf('Basic', module).add('Button', () => {
  const color = select<ButtonColor>('Color', {
    primary: 'primary',
    secondary: 'secondary',
  }, ButtonColor.Primary);

  const size = number('Size', 44);

  const onClick = action('onClick');

  const children = text('Children', 'Button');
  const disabled = boolean('Disabled', false);
  const isFullWidth = boolean('Is full width', false);
  const isLoading = boolean('isLoading', false);

  const type = radios('Type', {
    button: 'button',
    submit: 'submit',
  }, 'button');

  return (
    <Button
      type={type}
      fullWidth={isFullWidth}
      size={size}
      color={color}
      disabled={disabled}
      onClick={onClick}
      isLoading={isLoading}
    >
      {children}
    </Button>
  );
});
