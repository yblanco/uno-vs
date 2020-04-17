import React from 'react';
import { Columns } from 'react-bulma-components';

import { stats } from '../../constants/app.constant';


import Icons from '../Icons';
import UserStats from '../User/UserStats';
import InfoGame from '../Game/InfoGame';
import Modal from '../utils/Modal';
import Numbers from '../utils/Numbers';


import './play.css';

export default ({ user, game }) => {
  return (
    <Columns className='is-mobile is-vcentered user-point has-background-dark' centered>
      <Columns.Column
        mobile={{ size: 5 }}
        desktop={{ size: 4 }}
      >
        <UserStats user={user} stat={stats.level} field='level'  />
      </Columns.Column>
      <Columns.Column
        mobile={{ size: 5 }}
        desktop={{ size: 5 }}
      >
        <UserStats user={game} stat={stats.money} field='reward'  />
      </Columns.Column>
      <Columns.Column
        mobile={{ size: 2 }}
        desktop={{ size: 2 }}
        className='pointer info-game'
      >
        <Modal icon='info' size={24}>
          <InfoGame game={game} share={false} />
          <hr className='has-background-dark' />
          <Columns className='is-mobile is-vcentered'>
            <Columns.Column mobile={{ size: 4 }}>
              <Icons type='cup' size={48} />
            </Columns.Column>
            <Columns.Column mobile={{ size: 8 }} className='is-size-3'>
              <Numbers number={game.reward} pad={stats.money.pad} />
            </Columns.Column>
          </Columns>
        </Modal>
      </Columns.Column>
    </Columns>
  );
};
