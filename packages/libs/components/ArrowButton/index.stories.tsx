import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, select,
} from '@storybook/addon-knobs';
import { action } from '@storybook/addon-actions';
import ArrowButton, { ArrowType } from '.';

storiesOf('Basic', module).add('ArrowButton', () => {
  const onClick = action('onClick');
  const disabled = boolean('Disabled', false);
  const type = select<ArrowType>('Type', {
    left: ArrowType.left,
    right: ArrowType.rigth, 
  }, ArrowType.rigth);

  return (
    <ArrowButton onClick={onClick} disabled={disabled} type={type} />
  );
});
