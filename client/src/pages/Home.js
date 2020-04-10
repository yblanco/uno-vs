import React, { useContext, useEffect } from 'react';

import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import { useHistory, useLocation } from 'react-router';

import routes from '../routes';

import { listener } from '../socket';

import { Store } from '../reducers';

import Separator from '../components/utils/Separator';

import Logo from '../components/layout/Logo';
import LoginForm from '../components/Login/LoginForm';

import { authUser, checkUser } from '../actions/auth.action';
import { showSnackbarWarning } from '../actions/snackbar.action';

export default translate('home')(({ t }) => {
  const history = useHistory();
  const location = useLocation();
  const { state, dispatch } = useContext(Store);
  const { app, auth, game } = state;
  const { ready, lang } = app;
  const { check, authenticated } = auth;
  const { current } = game;
  const { id:socket } = listener;

  const mobile = { size: 12 };

  useEffect(() => {
    if(ready === true) {
      checkUser(dispatch, socket);
    }
  }, [dispatch, ready, socket])

  useEffect(() => {
    const { from } = location.state || { from: { pathname: routes.getLink('index') } };
    const redirect = current === false ? from : routes.getLink('game');
    if(authenticated !== false) {
      history.replace(redirect)
    }
  }, [dispatch, history, location, authenticated, current])

  return (
    <Columns centered className='is-vcentered is-mobile'>
      <Columns.Column desktop={{ size: 6 }} tablet={{ size:8 }} mobile={mobile} >
        <Logo />
      </Columns.Column>
      <Separator />
      <Columns.Column desktop={{ size: 5, offset: 1 }} tablet={{ size: 4 }} mobile={mobile} >
        <LoginForm
          disabled={(!ready && !check) || authenticated !== false}
          facebook={auth.facebook_id}
          google={auth.google_id}
          onLogin={(data) => authUser(dispatch, data, socket)}
          onError={(message) => showSnackbarWarning(dispatch, message)}
          lang={lang}
        />
      </Columns.Column>
    </Columns>
  );
});
