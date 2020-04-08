import React  from 'react';
import { Box, Media, Columns } from 'react-bulma-components';


import UserImage from '../User/UserImage';
import UserName from '../User/UserName';
import RankPosition from './RankPosition';


export default ({ t, user, index, auth }) => {
  const { id, position } = user;
  const isUser = auth === id;
  const classNameBackground = isUser ? 'has-background-dark' : 'has-background-black-ter';
  return (
    <Box className={`user ${classNameBackground}`}>
      <Media>
        <Media.Item renderAs='figure' position='left'>
          <UserImage user={user} size={24} />
        </Media.Item>
        <Media.Item>
          <Columns className='is-mobile'>
            <Columns.Column size={11}>
              <UserName user={user} />
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
