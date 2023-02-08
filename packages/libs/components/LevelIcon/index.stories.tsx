import React from 'react';
import { storiesOf } from '@storybook/react';
import { select } from '@storybook/addon-knobs';
import { values, keys } from 'ramda';
import { LevelIcon } from '.';
import { PlayerLevel } from '../../types/casino/levels';

const levels: Record<PlayerLevel, PlayerLevel> = values(PlayerLevel).reduce(
  (acc, level) => ({ ...acc, [level]: level }),
  {} as Record<PlayerLevel, PlayerLevel>,
);

storiesOf('Basic', module).add('LevelIcon', () => {
  const level = select('Level', levels, keys(levels)[1]);

  return (
    <LevelIcon level={level} />
  );
});
