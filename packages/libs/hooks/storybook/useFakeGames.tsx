import React, { useMemo } from 'react';

export const useFakeGames = (items = 10, width = 220, height = 330) => useMemo(() => {
  const games: JSX.Element[] = [];
  for (let i = 0; i < items; i += 1) {
    games.push(
      <div
        key={i}
        style={{
          height, width, backgroundColor: 'grey', borderRadius: 12,
        }}
      />,
    );
  }

  return games;
}, []);
