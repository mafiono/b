import { storiesOf } from '@storybook/react';
import React from 'react';
import { text, boolean } from '@storybook/addon-knobs';
import { Spoiler } from './index';

storiesOf('Basic', module).add('Spoiler', () => {
  const title = text('Value', 'Title spoiler');
  const openedByDefault = boolean('openedByDefault', false);
  return (
    <div style={{ width: 300 }}>
      <Spoiler
        title={title}
        openedByDefault={openedByDefault}
      >
        <div>Some hide element</div>
      </Spoiler>
    </div>
  );
});
