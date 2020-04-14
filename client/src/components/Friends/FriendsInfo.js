import React, { useState } from 'react';
import { Columns, Form } from 'react-bulma-components';
import { translate } from 'react-translate';

import './friends.css';

import FriendsItems from './FriendsItems';
import Button from '../utils/Button';
import Icons from '../Icons';



export default translate('friends')(({ t, friends, user, search, onSearch, onAdd }) => {
  const [string, setString] = useState('');
  const { friends_confirmed } = user;
  const isSearching = string.length > 0;
  console.log()

  const listFriends = friends
    .filter(({ id:friendId }) => friends_confirmed.find(({ id: itemId}) => itemId === friendId))
    .filter(({ name }) => name.toLowerCase().search(string.toLowerCase()) >= 0)
    .concat(search);

  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    setString(value);
  }

  const onClick = () => {
    if(isSearching) {
      onSearch(string);
    }
  }

  return (
    <Columns className='is-mobile '>
      <Columns.Column mobile={{ size: 10 }}>
          <Form.Input
            placeholder={t('search')}
            value={string}
            onChange={onChange}
          />
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} desktop={{ size: 1 }} tablet={{ size: 2 }}>
        <Button color='info' onClick={onClick} className='btn-friends' disabled={!isSearching}  >
          <Icons type='search' size={24} />
        </Button>
      </Columns.Column>
      <Columns.Column size={12} className='friends'>
        <FriendsItems users={listFriends} user={user}  onAdd={onAdd}  >
          {t('no_friends')}
        </FriendsItems>
      </Columns.Column>
    </Columns>
  )
});
