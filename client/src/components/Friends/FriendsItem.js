import React from 'react';
import { Columns } from 'react-bulma-components';

import UserName from '../User/UserName';
import UserImage from '../User/UserImage';
import Icons from '../Icons';

import './friends.css';

export default ({ t, user, auth, onAdd }) => {
  const { id } = user;
  const { requested_friends, friends_request, friends_confirmed } = auth;
  const isRequested = requested_friends.find(item => item === id) || false;
  const hasRequest = friends_request.find(item => item === id) || false;
  const isFriend = friends_confirmed.find(item => item === id) || false;

  let onClickAdd = () => onAdd(id);
  let addIcon = 'addfriend';
  let classNameAddIcon = 'pointer';
  if(isRequested !== false) {
    addIcon=  'cancelfriend';
  }
  if(hasRequest !== false) {
    addIcon = 'acceptfriend';
  }
  if(isFriend !== false) {
    onClickAdd = () => {};
    classNameAddIcon = '';
    addIcon = 'friends';
  }

  return (
      <Columns className='is-mobile user-list-item has-background-grey-dark'>
        <Columns.Column mobile={{ size: 2 }}>
          <UserImage user={user} size={32} />
        </Columns.Column>
        <Columns.Column mobile={{ size: 6 }}>
          <UserName user={user} auth={auth} />
        </Columns.Column>
        <Columns.Column mobile={{ size: 2, offset: 2 }} >
          <Icons type={addIcon} size={24} className={classNameAddIcon} onClick={onClickAdd} />
        </Columns.Column>
      </Columns>
  )
};
