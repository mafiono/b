import React from 'react';
import { storiesOf } from '@storybook/react';
import { boolean, number } from '@storybook/addon-knobs';

import { action } from '@storybook/addon-actions';
import { Toggle } from './index';

storiesOf('Basic', module).add('Toggle', () => {
  const size = number('Size', 24);
  const value = boolean('Value', true);
  const disabled = boolean('Disabled', false);
  const onChange = action('onChange');

  return (
    <Toggle value={value} onChange={onChange} size={size} disabled={disabled} />
  );
});
