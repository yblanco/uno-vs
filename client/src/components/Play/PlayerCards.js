import React from 'react';
import { Columns } from 'react-bulma-components';
import { translate } from 'react-translate';

import Card from './Card';
import Modal from '../utils/Modal';

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
  const left = (cards.length > 10 ? 10 : cards.length)/1.25;
  return (
    <Columns className='is-vcentered is-mobile board-game-me-content' centered >
      <Columns.Column mobile={{ size:11, offset:1 }} desktop={{ size: 5, offset: 3}}className='board-game-me'>
        {
          cards.map(({ color, card }, i) => (
            <Card color={color} card={card} me style={{ left: `${i*left}%` }} />
          ))
        }
      </Columns.Column>
      <Columns.Column
        mobile={{ size: 6, offset: 6 }}
        desktop={{ size:4 }}
        className='board-game-me has-text-right pointer has-text-weight-bold has-text-left-desktop'
      >
        <Modal text='Ver mas'>
          {
            cards.map(({ color, card }, i) => (
              <Card color={color} card={card} />
            ))
          }
        </Modal>
      </Columns.Column>
    </Columns>
  );
});
