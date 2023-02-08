import React from 'react';
import { storiesOf } from '@storybook/react';
import { number, select } from '@storybook/addon-knobs';
import { keys, values } from 'ramda';
import { UserImage } from './index';
import { PlayerLevel } from '../../types/casino/levels';
import avatar from '../../assets/img/profile/avatar.png';

const levels: Record<PlayerLevel, PlayerLevel> = values(PlayerLevel).reduce(
  (acc, level) => ({ ...acc, [level]: level }),
  {} as Record<PlayerLevel, PlayerLevel>,
);

storiesOf('Basic', module).add('UserImage', () => {
  const level = select('Level', levels, keys(levels)[1]);
  const progress = number('Progress %', 75);
  const size = number('Size, px', 44);

  return (
    <UserImage level={level} progress={progress} image={avatar} size={size} />
  );
});
