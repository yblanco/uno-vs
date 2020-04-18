import React from 'react';
import { Columns } from 'react-bulma-components';

import Card from './Card';
import PlayerInfo from './PlayerInfo';
import PlayerCards from './PlayerCards';
import Deck from './Deck';
import Uno from './Uno';

import './play.css';

export default ({ t, user, game, maxPlayers }) => {
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
      <Columns.Column size={4} className='has-tex-centered' >
        <Deck />
      </Columns.Column>
      <Columns.Column size={4} className='has-tex-centered'>
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
      <Columns.Column size={8} className='board-game-me'>
        <PlayerCards />
      </Columns.Column>
      <Uno />
    </Columns>
  );
};
