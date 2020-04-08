import React  from 'react';
import {  Content, Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import UserStats from './UserStats';
import UserName from './UserName';

import './user.css';

export default translate('user')(({ t, user}) => {
  const stats = [
    { name: 'level', pad: 3 },
    { name: 'money', pad: 4 },
    { name:'diamonds', pad: 2 }
  ];

  return (
    <Content>
      <Columns className='is-mobile is-vcentered'>
        <Columns.Column size={12} className='has-text-white has-text-weight-bold'>
          <UserName user={user} />
        </Columns.Column>
      </Columns>
      {
        stats.map(stat => (
          <UserStats  key={stat.name} text={user[stat.name]} type={stat.name} pad={stat.pad} />
        ))
      }
    </Content>
  );
});
