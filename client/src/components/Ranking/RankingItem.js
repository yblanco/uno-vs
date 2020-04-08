import React  from 'react';
import { Box, Media, Columns } from 'react-bulma-components';


import UserImage from '../User/UserImage';
import UserName from '../User/UserName';
import RankPosition from './RankPosition';


export default ({ t, user, index, auth }) => {
  const { id, position } = user;
  const isUser = auth === id;
  return (
    <Box className={`user has-background-dark ${isUser ? 'me' : 'else'}`}>
      <Media>
        <Media.Item renderAs='figure' position='left'>
          <UserImage user={user} size={24} />
        </Media.Item>
        <Media.Item>
          <Columns className='is-mobile'>
            <Columns.Column size={11}>
              <UserName user={user} auth={auth} />
            </Columns.Column>
            <Columns.Column size={1}>
              <RankPosition position={position || index + 1}/>
            </Columns.Column>
          </Columns>
        </Media.Item>
      </Media>
    </Box>
  );
};
