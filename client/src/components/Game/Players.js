import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import UserImage from '../User/UserImage';

export default translate('game')(({ t, game, maxPlayers }) => {
  const { user, players = [], cant = maxPlayers } = game;
  const users = players
    .concat(Array(cant-players.length)
    .fill({ picture: 'wait', icon: true }));
  return (
    <Columns className='is-mobile is-vcentered'>
      {
        users
        .concat(Array(maxPlayers-users.length)
        .fill({ picture: 'empty', name: '...', icon: true }))
        .map((player, index) => (
          <Columns.Column
            key={`${index}_${player.id}`}
            size={6}
            className={`${user === player.id && 'game-admin'} has-text-centered has-text-weight-bold`}
          >
            <UserImage user={player} icon={player.icon === true} />
            {player.name === undefined ? t('waiting_one') : player.name}
          </Columns.Column>
        ))
      }
    </Columns>
  );
});
