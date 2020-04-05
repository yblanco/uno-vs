import React, { useContext } from 'react';
import { Content, Columns } from 'react-bulma-components';

import { translate } from "react-translate";


import { Store } from '../reducers';

import Separator from '../components/utils/Separator';

import Logo from '../components/layout/Logo';
import LoginForm from '../components/Login/LoginForm';

import {  authUser } from '../actions/auth.action';

export default translate('home')(({ t }) => {
  const mobile = { size: 12 };
  const { state, dispatch } = useContext(Store);
  const { app, auth } = state;
  const { ready } = app;
  const { check, user } = auth;

  return (
    <Content>
      <Columns centered className="is-vcentered is-mobile">
        <Columns.Column desktop={{ size: 6 }} tablet={{ size:8 }} mobile={mobile} >
          <Logo />
        </Columns.Column>
        <Separator />
        <Columns.Column desktop={{ size: 5, offset: 1 }} tablet={{ size: 4 }} mobile={mobile} >
          <LoginForm
            disabled={(!ready && !check) || user !== false}
            id={auth.app_id}
            onLogin={(response) => authUser(dispatch, response)}
          />
        </Columns.Column>
      </Columns>
    </Content>
  );
});
