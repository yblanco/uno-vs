import React from 'react';
import { Columns } from 'react-bulma-components';
import { translate } from 'react-translate';

import './friends.css';
import UserName from '../User/UserName';
import UserImage from '../User/UserImage';
import Icons from '../Icons';

export default translate('friends')(({ t, user, friends, onAdd, onReject }) => {
  const { friends_request } = user;
  const requests = friends
    .filter(friend => friends_request.find(item => item === friend.id))
  return (
    <Columns className='is-mobile user-request'>
      {
        requests.length === 0
        ? (
          <Columns.Column size={12} className='has-text-centered'>
            {t('no_request')}
          </Columns.Column>
        )
        : requests.map(request => (
          <Columns.Column mobile={{ size: 6 }} className='has-text-centered has-background-grey-dark'>
            <UserImage user={request} size={32} />
            <UserName user={request} auth={user} />
            <Columns className='is-mobile has-background-grey user-request-button'>
              <Columns.Column mobile={{ size: 6 }}>
                <Icons type='acceptfriend' size={24} className='pointer' onClick={() => onAdd(request.id)} />
              </Columns.Column>
              <Columns.Column mobile={{ size: 6 }}>
                <Icons type='cancelfriend' size={24} className='pointer' onClick={() => onReject(request.id)} />
              </Columns.Column>
            </Columns>
          </Columns.Column>
        ))
      }
    </Columns>
  )
});
