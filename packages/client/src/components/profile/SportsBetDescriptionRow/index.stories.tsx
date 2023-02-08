import { storiesOf } from '@storybook/react';
import React from 'react';
import { text, number } from '@storybook/addon-knobs';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { SportsBetDescriptionRow } from './index';

storiesOf('Profile', module).add('SportsBetDescriptionRow', () => {    
  const startTime = text('StartTime', '29/06/2021 22:30');
  const gameName = {
    label: text('GameNameLabel', 'Oratorio Recreative Clube AP U20 - Santos AP Macapa U20'),
    icon: FontIconName.Football,
  };
  const bet = text('Bet', 'Match Result - W1');
  const odds = number('Odds', 1.55);
  
  return (
    <SportsBetDescriptionRow 
      startTime={startTime}
      gameName={gameName}
      bet={bet}
      odds={odds}
    />
  );
});
