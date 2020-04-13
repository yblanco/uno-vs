import React, { useState } from 'react';
import { Columns, Form } from 'react-bulma-components';
import { translate } from 'react-translate';

import './friends.css';

import FriendsItems from './FriendsItems';


export default translate('friends')(({ t, friends, user }) => {
  const { friends_confirmed } = user;
  const [search, setSearch] = useState('');
  const hasfriends = friends.length > 0;
  const listFriends = friends
    .filter(friend => friends_confirmed.find(item => item === friend.id))
    .filter(friend => friend.name.toLowerCase().search(search.toLowerCase()) >= 0);
  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    setSearch(value);
  }
  return (
    <Columns className='is-mobile '>
      <Columns.Column mobile={{ size: 12 }}>
          <Form.Input
            disabled={!hasfriends}
            placeholder={t('search')}
            value={search}
            onChange={onChange}
          />
      </Columns.Column>
      <Columns.Column size={12} className='friends'>
        <FriendsItems users={listFriends} user={user} onAdd={() => {}} >
          {t('no_friends')}
        </FriendsItems>
      </Columns.Column>
    </Columns>
  )
});
