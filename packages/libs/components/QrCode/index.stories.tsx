import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, number } from '@storybook/addon-knobs';
import QrCode from '.';

storiesOf('Basic', module).add('QrCode', () => {
  const value = text('Value', 'https://www.youtube.com/watch?v=SB-qEYVdvXA&t');
  const bgColor = text('BgColor', '#222638');
  const fgColor = text('FgColor', '#fff');
  const size = number('Size', 200);

  return (
    <QrCode value={value} fgColor={fgColor} bgColor={bgColor} size={size} />
  );
});
