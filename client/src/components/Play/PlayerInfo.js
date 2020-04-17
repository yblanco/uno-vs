import React from 'react';
import { Columns, Content } from 'react-bulma-components';

import UserImage from '../User/UserImage';
import BadgetPlayer from './BadgetPlayer';
import PlayerIcons from './PlayerIcons';

import './play.css';

export default ({ player, show = true, color='me', me = false }) => {
  const { name = '', cards = 7 } = player;
  const [firstName] = name.split(' ');

  return (
    <Columns centered className={`player-game-info color-${color} is-vcentered`}>
      {
        show && [
          (
            <Columns.Column size={12} key='image'>
              <UserImage user={player} />
              { !me && (<BadgetPlayer cards={cards} />)}
            </Columns.Column>
          ),
          (
            <Columns.Column size={12} className='has-text-centered' key='name'>
              <Content className='player-name'>{firstName}</Content>
            </Columns.Column>
          ),
          (
            <Columns.Column size={12} className='has-text-centered' key='options'>
              { me && (<PlayerIcons />) }
            </Columns.Column>
          )
        ]
      }
    </Columns>
  );
};
