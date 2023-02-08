import { storiesOf } from '@storybook/react';
import React from 'react';
import image from '@betnomi/libs/assets/img/profile/avatar.png';
import {
  date, number, select, text,
} from '@storybook/addon-knobs';
import { keys, values } from 'ramda';
import { ChatMessage } from './index';
import { PlayerLevel } from '../../../types/casino/levels';

const levels: Record<PlayerLevel, PlayerLevel> = values(PlayerLevel).reduce(
  (acc, level) => ({ ...acc, [level]: level }),
  {} as Record<PlayerLevel, PlayerLevel>,
);

storiesOf('Chat', module).add('ChatMessage', () => {
  const progress = number('Progress', 75);
  const level = select('Level', levels, keys(levels)[1]);
  const username = text('Username', 'gameboy');
  const t = text(
    'Text',
    'because I see you ..you want help. Befor hours u said my depo. Not now. lolI I catch you 😊',
  );
  const timestamp = date('Timestamp', new Date());

  return (
    <div style={{ maxWidth: 300, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 8 }}>
      <ChatMessage
        image={image}
        progress={progress}
        level={level}
        username={username}
        timestamp={timestamp}
      >
        {t}
      </ChatMessage>
    </div>
  );
});
