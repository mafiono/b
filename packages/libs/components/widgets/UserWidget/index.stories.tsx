import React from 'react';
import { storiesOf } from '@storybook/react';
import {
  boolean, number, select, text,
} from '@storybook/addon-knobs';
import { keys, values } from 'ramda';
import { action } from '@storybook/addon-actions';
import avatar from '../../../assets/img/profile/avatar.png';
import { PlayerLevel } from '../../../types/casino/levels';
import { UserWidget } from './index';

const levels: Record<PlayerLevel, PlayerLevel> = values(PlayerLevel).reduce(
  (acc, level) => ({ ...acc, [level]: level }),
  {} as Record<PlayerLevel, PlayerLevel>,
);

storiesOf('Basic', module).add('UserWidget', () => {
  const level = select('Level', levels, keys(levels)[1]);
  const name = text('Name', 'ermalength');
  const progress = number('Progress %', 75);
  const confirmed = boolean('Confirmed%', true);
  const onLogout = action('onLogout');

  return (
    <UserWidget
      level={level}
      name={name}
      progress={progress}
      image={avatar}
      confirmed={confirmed}
      onLogout={onLogout}
    />
  );
});
