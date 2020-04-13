import React from 'react';
import { Columns } from 'react-bulma-components';
import { translate } from 'react-translate';

import FriendsItem from './FriendsItem';

import './friends.css';

export default translate('friends')(({ t, users, user, children, onAdd }) => {

  return (
    <Columns className='has-text-white'>
      {
        users.length > 0
        ? (
          users.map(item => (
            <FriendsItem key={item.id} user={item} auth={user} onAdd={onAdd} />
          ))
        )
        : (
          <Columns.Column size={12} className='has-text-centered'>
            {children}
          </Columns.Column>
        )
      }
    </Columns>
  )
});
