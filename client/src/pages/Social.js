import React, {  useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { Link } from 'react-router-dom';
import routes from '../routes';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';
import Messages from '../components/Buttons/Messages';
import Friends from '../components/Buttons/Friends';


export default () => {
  const { state } = useContext(Store);
  const { auth } = state;
  const { authenticated } = auth;

  return (
    <Columns className='is-mobile'>
      <Columns.Column size={12}>
        <TitleInner route='index' user={authenticated} />
      </Columns.Column>
      <Columns.Column
        mobile={{ size: 6, }}
        desktop={{ size: 3, offset: 3 }}
      >
        <Link to={routes.getLink('friends')}>
          <Friends />
        </Link>
      </Columns.Column>
      <Columns.Column
        mobile={{ size: 6, }}
        desktop={{ size: 3 }}
        style={{ opacity: 0.5 }}
      >
          <Messages />
      </Columns.Column>
    </Columns>
  );
};
