import React  from 'react';
import { Box, Media } from 'react-bulma-components';

import { translate } from 'react-translate';

import UserImage from './UserImage';
import UserInfoContent from './UserInfoContent';

import './user.css';

export default translate('user')(({ t, user, position = false, auth = 0 }) => {
  const isUser = auth === user.id;
  const classNameBackground = isUser ? 'has-background-dark' : 'has-background-black-ter';
  return (
    <Box className={`user ${classNameBackground}`}>
      <Media>
        <Media.Item renderAs='figure' position='left'>
          <UserImage user={user} />
        </Media.Item>
        <Media.Item>
          <UserInfoContent user={user} position={position} connected={user.online === true || isUser} />
        </Media.Item>
      </Media>
    </Box>
  );
});
