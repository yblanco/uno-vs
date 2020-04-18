import React from 'react';
import { Columns } from 'react-bulma-components';
import { translate } from 'react-translate';

import Card from './Card';

import './play.css';

export default translate('play')(({ t }) => {
  const cards = [
    { color: 'red', card: 'seven' },
    { color: 'green', card: 'zero' },
    { color: 'neutral', card: 'draw-two' },
    { color: 'blue', card: 'reverse' },
    { color: 'yellow', card: 'draw-four' },
    { color: 'blue', card: 'skip' },
    { color: 'neutral', card: 'wild' },
    { color: 'red', card: 'seven' },
    { color: 'green', card: 'zero' },
    { color: 'red', card: 'five' },
  ];
  return (
    <Columns className='is-vcentered is-mobile board-game-me-content' centered >

      <Columns.Column size={11} offset={1} className='board-game-me'>
        {
          cards.map(({ color, card }, i) => (
            <Card color={color} card={card} me style={{ left: `${i*1.25}em` }} />
          ))
        }
      </Columns.Column>
      <Columns.Column size={6} offset={6} className='board-game-me has-text-right pointer has-text-weight-bold'>
        Ver Más
      </Columns.Column>
    </Columns>
  );
});
