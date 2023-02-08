import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, boolean } from '@storybook/addon-knobs';
import Link from '.';

storiesOf('Basic', module).add('Link', () => {
  const children = text('Children', 'Link');
  const to = text('to', 'to');
  const stopPropagation = boolean('stopPropagation', false);

  return (
    <Link
      to={to}
      stopPropagation={stopPropagation}
    >
      {children}
    </Link>
  );
});
