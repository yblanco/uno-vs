import React from 'react';
import { Columns, Image } from 'react-bulma-components';

import { Link } from 'react-router-dom';
import routes from '../../routes';

import UserImage from '../User/UserImage';
import UserInfoPoints from '../User/UserInfoPoints';

import back from './back.png';

export default ({ user, route }) => {
  return (
    <Columns className='is-mobile is-vcentered title-inner'>
        <Columns.Column size={3} className='pointer'>
          <Link to={routes.getLink(route)}>
            <Image src={back} alt='back' size={48} />
          </Link>
        </Columns.Column>
      <Columns.Column size={3} offset={6} className='info'>
        <UserImage user={user} size={48} />
      </Columns.Column>
      <Columns.Column size={12}>
        <UserInfoPoints user={user} />
      </Columns.Column>
    </Columns>
  );
};
