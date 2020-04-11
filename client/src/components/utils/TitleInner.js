import React from 'react';
import { Columns } from 'react-bulma-components';

import { Link } from 'react-router-dom';
import routes from '../../routes';

import UserImage from '../User/UserImage';
import UserInfoPoints from '../User/UserInfoPoints';
import Icons from '../Icons';

export default ({ user, route = false, onClick = false, icon='back' }) => {
  const click = onClick === false ? () => {} : onClick;
  const isIcon = icon !== false;
  return (
    <Columns className='is-mobile is-vcentered title-inner'>
        <Columns.Column
          mobile={{ size: 3 }}
          desktop={{ size: 2 }}
          className={`${isIcon && 'pointer' }`}
          onClick={click}
        >
          {
            isIcon && (
              <Link to={routes.getLink(route)}>
                <Icons type={icon} size={48} />
              </Link>
            )
          }
        </Columns.Column>
      <Columns.Column
        mobile={{ size: 3, offset: 6 }}
        desktop={{ size: 2, offset: 8 }}
      >
        <UserImage user={user} size={48} />
      </Columns.Column>
      <Columns.Column size={12}>
        <UserInfoPoints user={user} />
      </Columns.Column>
    </Columns>
  );
};
