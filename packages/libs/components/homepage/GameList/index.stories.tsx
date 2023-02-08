import React from 'react';
import { storiesOf } from '@storybook/react';
import { keys } from 'ramda';
import { number, select } from '@storybook/addon-knobs';
import { GameType } from '../../../types/ui/games';
import GameList from '.';
import { useFakeGames } from '../../../hooks/storybook/useFakeGames';

const gameTypes: Record<GameType, GameType> = keys(GameType).reduce(
  (acc, type) => ({ ...acc, [type]: type }),
  {} as Record<GameType, GameType>,
);

storiesOf('Basic', module).add('GameList', () => {
  const games = useFakeGames();
  const gameType = select<GameType>('GameType', gameTypes, keys(gameTypes)[0]);
  const items = number('Items', 0);
  const spaceBetween = number('Space Between', 24);
  return (
    <div style={{ width: 700 }}>
      <GameList
        games={games}
        gameType={gameType}
        items={items}
        spaceBetween={spaceBetween}
      />
    </div>
  );
});
