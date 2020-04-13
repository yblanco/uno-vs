import React, { useState } from 'react';
import { Columns, Tabs, Tag } from 'react-bulma-components';
import { translate } from 'react-translate';

import TitleForm from '../utils/TitleForm';

import FriendsSearch from './FriendsSearch';
import FriendsShow from './FriendsShow';
import FriendsInfo from './FriendsInfo';


import './friends.css';


export default translate('friends')(({ t, user, friends, search, onSearch, onAdd, onReject }) => {
  const tabs = ['friends', 'search', 'request'];
  const [active, setActive] = useState(tabs[0]);
  const { friends_request:requests } = user;
  const requestsNum = requests.length;

  let child = '';
  switch (active) {
    case tabs[1]:
      child = (<FriendsSearch onSearch={onSearch} search={search} user={user} onAdd={onAdd}  />)
      break;
    case tabs[2]:
      child = (<FriendsShow friends={friends} user={user} onAdd={onAdd} onReject={onReject} />);
      break;
    default:
      child = (<FriendsInfo friends={friends} user={user} />);
  }

  return (
    <Columns className='is-mobile '>
      <Columns.Column size={12}>
        <TitleForm>
          {t('friends')}
        </TitleForm>
      </Columns.Column>
      <Columns.Column size={12} className='friend-list-content'>
        <Tabs type='toggle' fullwidth={true} align='centered' className='has-background-grey-dark friends-tab'>
          {
            tabs.map(tab => (
              <Tabs.Tab
                className={`${active === tab  ? 'has-background-dark active' : ''}`}
                onClick={() => setActive(tab)}
                key={tab}
              >
                {t(tab)}
                {
                  tab === tabs[2] && requestsNum > 0 && (<Tag color='info'>{requestsNum}</Tag> )
                }
              </Tabs.Tab>
            ))
          }
        </Tabs>
      </Columns.Column>
      <Columns.Column size={12} className='has-background-dark friends-list'>
        {child}
      </Columns.Column>
    </Columns>
  )
});
