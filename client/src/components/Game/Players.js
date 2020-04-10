import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import UserImage from '../User/UserImage';


export default translate('game')(({ t, game }) => {
  const { user, players = [], cant = 0 } = game;
  const users = players.concat(Array(cant-players.length).fill({ picture: 'default-user.png',  }));
  return (
    <Columns className='is-mobile is-vcentered'>
      {
        users.map((player, index) => (
          <Columns.Column
            key={`${index}_${player.id}`}
            mobile={{ size: 6 }}
            className={`${user === player.id && 'game-admin'} has-text-centered has-text-weight-bold`}
          >
            <UserImage user={player} />
            {player.name === undefined ? t('waiting_one') : player.name}
          </Columns.Column>
        ))
      }
    </Columns>
  );
});
