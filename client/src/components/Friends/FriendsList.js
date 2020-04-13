import React, { useState } from 'react';
import { Columns, Tabs } from 'react-bulma-components';
import { translate } from 'react-translate';

import TitleForm from '../utils/TitleForm';

import FriendsSearch from './FriendsSearch';
import FriendsShow from './FriendsShow';
import FriendsInfo from './FriendsInfo';
import BadgetFloat from '../utils/BadgetFloat';
import Messages from '../Buttons/Messages';

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
      <Columns.Column size={2} offset={10} style={{ opacity: 0.5 }} className='is-parent-badget'>
        <Messages />
        <BadgetFloat cant={1}/>
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
                  tab === tabs[2] && <BadgetFloat cant={requestsNum} float={false} />
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
