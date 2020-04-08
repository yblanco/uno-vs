import React from 'react';
import { Columns } from 'react-bulma-components';

import RankingItem from './RankingItem';


export default ({ ranks = [], type, auth }) => {
  return (
    <Columns className='ranking-list'>
      {ranks.map((user, index) => (
        <Columns.Column key={user.id} size={12} >
          <RankingItem user={user} index={index} auth={auth} />
        </Columns.Column>
      ))}
    </Columns>
  );
};
