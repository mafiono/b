import React from 'react';
import { storiesOf } from '@storybook/react';
import { text, select, number } from '@storybook/addon-knobs';
import { FontIconName } from '@betnomi/libs/components/FontIcon';
import { CoinType } from '@betnomi/libs/types/ui';
import { SportsBetRow } from './index';
import { BetResult } from '../../../constants/BetResult';

storiesOf('Profile', module).add('SportsBetRow', () => {
  const date = text('date', '29/06/2021 23:05');
  const id = text('id', '8475648394');
  const betType = text('betType', 'Single');
  const resultType = select('Selected', BetResult, BetResult.Win);
  const price = text('resultPrice', '');
  const stake = {
    coin: CoinType.bitcoin,
    value: number('stakeValue', 230.00),
  };
  const potentialWin = {
    coin: CoinType.bitcoin,
    value: number('potentialWinValue', 730),
  };
  const result = {
    type: resultType,
    label: 'win',
    price,
  };
  const items = [
    {
      startTime: text('StartTime', '29/06/2021 22:30'),
      gameName: {
        label: text('GameNameLabel', 'Oratorio Recreative Clube AP U20 - Santos AP Macapa U20'),
        icon: FontIconName.Football,
      },
      bet: text('Bet', 'Match Result - W1'),
      odds: number('Odds', 1.55),
    },
  ];

  return (
    <SportsBetRow
      date={date} 
      id={id}
      betType={betType}
      stake={stake}
      potentialWin={potentialWin}
      result={result}
      items={items}
    />
  );
});
