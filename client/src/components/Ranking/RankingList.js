import React from 'react';
import { Columns } from 'react-bulma-components';

import UserInfo from '../User/UserInfo';


export default ({ ranks = [], type, auth }) => {
  return (
    <Columns className='ranking-list'>
      {ranks.map((user, index) => (
        <Columns.Column key={user.id} size={12} >
          <UserInfo user={user} rank position={user.position || index + 1} auth={auth} />
        </Columns.Column>
      ))}
    </Columns>
  );
};
