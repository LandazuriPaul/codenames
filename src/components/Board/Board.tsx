import React, { FC } from 'react';

import { GameStore } from '~/stores';
import { Tile } from '~/components/Tile';

import { Container } from './board.styles';

export const Board: FC<{}> = () => {
  let counter = -1;
  return (
    <Container>
      <tbody>
        {Array(GameStore.ROW_COUNT)
          .fill(null)
          .map((row, rowIndex) => (
            <tr key={rowIndex}>
              {Array(GameStore.COL_COUNT)
                .fill(null)
                .map((cell, colIndex) => {
                  counter++;
                  return <Tile key={colIndex} cellIndex={counter} />;
                })}
            </tr>
          ))}
      </tbody>
    </Container>
  );
};
