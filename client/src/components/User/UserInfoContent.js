import React  from 'react';
import {  Content, Columns } from 'react-bulma-components';

import UserName from './UserName';

import './user.css';

export default ({ user }) => (
  <Content>
    <Columns className='is-mobile is-vcentered'>
      <Columns.Column size={12} className='has-text-white has-text-weight-bold'>
        <UserName user={user} />
      </Columns.Column>
    </Columns>
    <Columns className='is-mobile is-vcentered'>
      <Columns.Column size={12} className='has-text-white has-text-weight-bold'>
        ICONOS
      </Columns.Column>
    </Columns>
  </Content>
);
