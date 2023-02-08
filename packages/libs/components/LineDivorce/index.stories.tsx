import React from 'react';
import { storiesOf } from '@storybook/react';
import { text } from '@storybook/addon-knobs';
import LineDivorce from '.';

storiesOf('Basic', module).add('LineDivorce', () => {
  const propText = text('Children', 'LineDivorce');
  return (
    <LineDivorce
      text={propText}
    />
  );
});
