import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { boolean } from '@storybook/addon-knobs';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { HeaderToggleButton } from './index';

storiesOf('Layout', module).add('HeaderToggleButton', () => {
  const onClick = action('Click');
  const active = boolean('Active', false);

  return (
    <HeaderToggleButton onClick={onClick} active={active} icon={FontIconName.Chat} />
  );
});
