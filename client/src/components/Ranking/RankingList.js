import React from 'react';
import { Columns } from 'react-bulma-components';

import RankingItem from './RankingItem';


export default ({ ranks = [], type, auth, rank }) => {
  const { id: me } = auth;
  const isRanked = ranks.find(({ id }) => id === me) !== undefined;
  const lists = isRanked ? ranks : ranks.concat({ ...auth, position: rank });

  return (
    <Columns className='ranking-list'>
      {lists.map((user, index) => (
        <Columns.Column key={user.id} size={12} >
          <RankingItem user={user} index={index} auth={me} />
        </Columns.Column>
      ))}
    </Columns>
  );
};
