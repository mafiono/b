import { storiesOf } from '@storybook/react';
import React from 'react';
import { date, text } from '@storybook/addon-knobs';
import { SentMessage } from './index';

storiesOf('Chat', module).add('SentMessage', () => {
  const t = text(
    'Text',
    'because I see you ..you want help. Befor hours u said my depo. Not now. lolI I catch you 😊',
  );
  const timestamp = date('Timestamp', new Date());

  return (
    <div style={{ maxWidth: 300, backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 8 }}>
      <SentMessage
        timestamp={timestamp}
      >
        {t}
      </SentMessage>
    </div>
  );
});
