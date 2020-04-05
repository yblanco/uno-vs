import React  from 'react';
import { Box, Media, Image, Content, Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import UserStats from './UserStats';

import settings from './settings.png';

import './user.css';

export default translate('user')(({ t, user }) => {
  return (
    <Box className='user has-background-dark '>
      <Media>
        <Media.Item renderAs='figure' position='left'>
          <Image size={64} alt={user.name} src={user.picture} rounded className='profile-pic'  />
        </Media.Item>
        <Media.Item>
          <Content >
            <Columns className='is-mobile is-vcentered'>
              <Columns.Column size={10} className='has-text-white has-text-weight-bold'>
                {user.name}
              </Columns.Column>
              <Columns.Column size={2} className='pointer'>
                <Image size={24} alt='setting' src={settings} className='is-text-centered'/>
              </Columns.Column>
            </Columns>
            <UserStats text={user.level} type='level' pad={2} />
            <UserStats text={user.money} type='money' pad={4}/>
            <UserStats text={user.diamonds} type='diamonds' pad={3}/>
          </Content>
        </Media.Item>
      </Media>
    </Box>
  );
});
