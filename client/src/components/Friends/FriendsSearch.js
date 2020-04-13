import React, { useState } from 'react';
import { Columns, Form } from 'react-bulma-components';
import { translate } from 'react-translate';

import Button from '../utils/Button';
import Icons from '../Icons';

import FriendsItems from './FriendsItems';

import './friends.css';


export default translate('friends')(({ t, user, onSearch, search, onAdd, onBlock }) => {
  const [searching, setSearching] = useState(false);
  const [string, setString] = useState('');
  const isSearching = string.length > 0;
  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    setString(value);
  }
  const onClick = () => {
    if(isSearching) {
      onSearch(string)
        .then(searched => setSearching(searched))
    }
  }

  return (
    <Columns className='is-mobile '>
      <Columns.Column mobile={{ size: 10 }} desktop={{ size: 11 }} tablet={{ size: 10 }}>
          <Form.Input placeholder={t('search')} value={string} onChange={onChange} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} desktop={{ size: 1 }} tablet={{ size: 2 }}>
        <Button color='info' onClick={onClick} className='btn-friends' disabled={!isSearching} >
          <Icons type='search' size={24} />
        </Button>
      </Columns.Column>
      <Columns.Column size={12} className='friends'>
        {
          searching
          ? (
              <FriendsItems users={search} user={user} onAdd={onAdd} onBlock={onBlock}>
                {t('no_friends_found')}
              </FriendsItems>
            )
          : (
            <Columns.Column size={12} className='has-text-centered'>
              {t('search_friend')}
            </Columns.Column>
          )
        }
      </Columns.Column>
    </Columns>
  )
});
