import React, { useEffect, useContext } from 'react';
import { Content, Columns } from 'react-bulma-components';

import { translate } from "react-translate";

// import { Link, Redirect } from 'react-router-dom';

// import routes from '../routes';

import { Store } from '../reducers';

import UserInfo from '../components/User/UserInfo';
import New from '../components/Buttons/New';
import Join from '../components/Buttons/Join';


export default translate('index')(({ t }) => {
  const { state, dispatch } = useContext(Store);
  const { auth } = state;
  const { user } = auth;

  return (
    <Content>
      <Columns className='is-mobile'>
        <Columns.Column size={12}>
          <UserInfo user={user} />
        </Columns.Column>
        <Columns.Column size={12} className='has-background-white	divider'/>
        <Columns.Column size={6}>
          <New />
        </Columns.Column>
        <Columns.Column size={6}>
          <Join />
        </Columns.Column>
        <Columns.Column size={12}>
          Rankinkg
        </Columns.Column>
      </Columns>
    </Content>
  );
});
