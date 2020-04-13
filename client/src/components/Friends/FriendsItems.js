import React, { useState } from 'react';
import { Columns, Pagination } from 'react-bulma-components';
import { translate } from 'react-translate';

import { perPage } from '../../constants/app.constant';

import FriendsItem from './FriendsItem';

import './friends.css';

export default translate('friends')(({ t, users, user, children, onAdd }) => {
  const [page, setPage] = useState(1);
  const totalUser = users.length;
  const hasUser =  totalUser > 0;
  const total = parseInt(Math.ceil(totalUser/perPage), 10);
  return (
    <Columns className='has-text-white'>
      {
        hasUser
        ? (
          users.slice(page-1*perPage, page*perPage).map(item => (
            <FriendsItem key={item.id} user={item} auth={user} onAdd={onAdd} />
          ))
        )
        : (
          <Columns.Column size={12} className='has-text-centered'>
            {children}
          </Columns.Column>
        )
      }
      {
        hasUser && (
          <Columns.Column size={12}>
            <Pagination
              autoHide
              total={total}
              current={page}
              delta={1}
              showPrevNext={false}
              onChange={setPage}
            />
          </Columns.Column>
        )
      }
    </Columns>
  )
});
