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
      <Columns.Column mobile={{ size: 2, offset: 2 }} tablet={{ size: 2 }} desktop={{ size: 1, offset: 4 }}>
        <Icons type='friends' size={16} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} tablet={{ size: 2 }} desktop={{ size: 1 }}>
        <Numbers number={(user.friends || []).length} pad={3} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} tablet={{ size: 2 }} desktop={{ size: 1 }}>
        <Icons type='cup' size={16} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 6 }} tablet={{ size: 6 }} desktop={{ size: 1, offset: 4 }}>
        0/0
      </Columns.Column>
    </Columns>
  </Content>
);
