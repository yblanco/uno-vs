import React from 'react';
import { Columns } from 'react-bulma-components';
import { translate } from 'react-translate';

// import { stats } from '../../constants/app.constant';

//
// import Icons from '../Icons';
// import UserStats from '../User/UserStats';
// import InfoGame from '../Game/InfoGame';
// import Modal from '../utils/Modal';
// import Numbers from '../utils/Numbers';
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
    .concat(Array(fill).fill({}));
  const show = total > 2;

  return (
    <Columns className='is-mobile is-vcentered board-game' centered >
      <Columns.Column size={4} offset={4} className='has-tex-centered'>
        <PlayerInfo player={player1} color='first' />
      </Columns.Column>
      <Columns.Column size={4} className='has-tex-centered' />
      <Columns.Column size={4} className='has-text-centered'>
        <PlayerInfo player={player2} show={show} color='second' />
      </Columns.Column>
      <Columns.Column size={4} className='has-text-centered board-game-board'>
        MESA
      </Columns.Column>
      <Columns.Column size={4} className='has-text-centered'>
        <PlayerInfo player={player3} show={show} color='third' />
      </Columns.Column>
      <Columns.Column size={4}>
        <PlayerInfo player={me}  me />
      </Columns.Column>
      <Columns.Column size={6}>
        Cartas
      </Columns.Column>
    </Columns>
  );
});
