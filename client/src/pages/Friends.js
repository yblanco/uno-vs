import React, { useContext, useState } from 'react';
import { Columns } from 'react-bulma-components';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';
import FriendsList from '../components/Friends/FriendsList';

import { searchUser, addFriend, rejectFriend } from '../actions/user.action';

export default () => {
  const { state, dispatch } = useContext(Store);
  const [search, setSearch] = useState([]);
  const { auth } = state;
  const { authenticated } = auth;
  const { id, friends = [] } = authenticated;
  const onSearch = (string) => {
    return searchUser(dispatch, id, string)
      .then(searched => {
        if(searched !== false) {
          setSearch(searched);
          return true;
        }
        return false;
      });
  }
  const onAdd = (user) => {
    return addFriend(dispatch, id, user);
  }

  const onReject = (user) => {
    return rejectFriend(dispatch, id, user);
  }

  return (
    <Columns className='is-vcentered'>
      <Columns.Column size={12}>
        <TitleInner route='social' user={authenticated} />
      </Columns.Column>
      <Columns.Column>
        <FriendsList
          friends={friends}
          search={search}
          onSearch={onSearch}
          user={authenticated}
          onAdd={onAdd}
          onReject={onReject}
        />
      </Columns.Column>
    </Columns>
  );
};
