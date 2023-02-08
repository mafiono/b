import { storiesOf } from '@storybook/react';
import React from 'react';
import { number, text } from '@storybook/addon-knobs/dist';
import GameBanner from './index';

const image = 'https:\\/\\/www.cmsbetconstruct.com\\/content\\/images\\/casino\\/icon3\\/e9bb165c4bc0c7107cf47b33fb8b3d90_casinoGameIcon3.jpg';

storiesOf('Basic', module).add('GameBanner', () => {
  const width = number('Width', 350);
  const height = number('Height', 220);
  const name = text('Name', 'Name');

  return (
    <GameBanner image={image} width={width} height={height} name={name} />
  );
});
