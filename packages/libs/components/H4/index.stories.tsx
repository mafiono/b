import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import React from 'react';
import H4 from '.';

storiesOf('Basic', module).add('H4', () => {
  const children = text('Children', 'Label');

  return (
    <H4>{children}</H4>
  );
});
