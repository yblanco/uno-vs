import React  from 'react';
import {  Content, Columns } from 'react-bulma-components';

import UserName from './UserName';
import Icons from '../Icons';
import Numbers from '../utils/Numbers';

import './user.css';

export default ({ user }) => (
  <Content className='user-me'>
    <Columns className='is-mobile is-vcentered'>
      <Columns.Column size={12} className='has-text-white has-text-weight-bold'>
        <UserName user={user} />
      </Columns.Column>
    </Columns>
    <Columns className='is-mobile is-vcentered has-text-white is-size-7'>
      <Columns.Column size={2}>
        <Icons type='friends' size={16} />
      </Columns.Column>
      <Columns.Column size={2}>
        <Numbers number={(user.friends || []).length} pad={3} />
      </Columns.Column>
      <Columns.Column size={2}>
        <Icons type='cup' size={16} />
      </Columns.Column>
      <Columns.Column size={6}>
        0/0
      </Columns.Column>
    </Columns>
  </Content>
);
