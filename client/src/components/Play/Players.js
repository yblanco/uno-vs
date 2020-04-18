import React from 'react';
import { Columns } from 'react-bulma-components';
import { translate } from 'react-translate';

// import { stats } from '../../constants/app.constant';

//
import Card from './Card';
import PlayerInfo from './PlayerInfo';


import './play.css';

export default translate('play')(({ t, user, game, maxPlayers }) => {
  const { players = [] } = game;
  const { id } = user;
  const total = players.length;
  const fill = maxPlayers - total;
  const me = players.find(({ id:player }) => player === id);
  const [player1, player2, player3] = players
    .filter(({ id: player }) => player !== id)
    .concat(Array(fill).fill({ disabled: true, hide: total === 2, picture: 'empty' }));
  return (
    <Columns className='is-mobile is-vcentered board-game' centered >
      <Columns.Column size={4} offset={4} className='has-tex-centered'>
        <PlayerInfo player={player1} color='first' />
      </Columns.Column>
      <Columns.Column size={4} className='has-tex-centered' />
      <Columns.Column size={4} className='has-text-centered'>
        <PlayerInfo player={player2} color='second' />
      </Columns.Column>
      <Columns.Column size={4} className='has-text-centered board-game-board'>
        <Card />
      </Columns.Column>
      <Columns.Column size={4} className='has-text-centered'>
        <PlayerInfo player={player3} color='third' />
      </Columns.Column>
      <Columns.Column size={4}>
        <PlayerInfo player={me}  me />
      </Columns.Column>
      <Columns.Column size={6} className='board-game-me'>
        {
          [
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
          ].map(({ color, card }, i) => (
            <Card color={color} card={card} me style={{ left: `${i*1.25}em` }} />
          ))
        }
      </Columns.Column>
      <Columns.Column size={2} className='board-game-me'>
      </Columns.Column>
    </Columns>
  );
});
