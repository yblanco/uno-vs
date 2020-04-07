import React  from 'react';
import {  Content, Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import UserStats from './UserStats';

import RankPosition from '../Ranking/RankPosition';

import './user.css';

export default translate('user')(({ t, user, position = false, connected = false }) => {
  const showPosition = position !== false;
  const size = showPosition ? 10 : 12;
  const stats = [
    { name: 'level', pad: 3 },
    { name: 'money', pad: 4 },
    { name:'diamonds', pad: 2 }
  ];
  const status = connected ? 'online' : 'offline'
  return (
    <Content>
      <Columns className='is-mobile is-vcentered'>
        <Columns.Column size={size} className='has-text-white has-text-weight-bold'>
          {user.name}
          {' '}
          <span className={`status-user is-size-7 has-text-success	${status}`}>
            { t(status)}
          </span>
        </Columns.Column>
        {
          showPosition && (
            <Columns.Column size={2} className='pointer has-text-centered'>
              <RankPosition position={position} />
            </Columns.Column>
          )
        }

      </Columns>
      {
        stats.map(stat => (
          <UserStats  key={stat.name} text={user[stat.name]} type={stat.name} pad={stat.pad} />
        ))
      }
    </Content>
  );
});
