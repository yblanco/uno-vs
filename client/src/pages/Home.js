import React, { useContext, useEffect, useState } from 'react';

import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import { Redirect } from 'react-router';

import routes from '../routes';

import { listener } from '../socket';

import { Store } from '../reducers';

import Separator from '../components/utils/Separator';

import Logo from '../components/layout/Logo';
import LoginForm from '../components/Login/LoginForm';

import { showSnackbarWarning } from '../actions/snackbar.action';

import { authUser, checkUser } from '../actions/auth.action';
import { getAppId } from '../actions/auth.action';

export default translate('home')(({ t, location = {} }) => {
  const { state: history = {}, search } = location;
  const { state, dispatch } = useContext(Store);
  const [redirect, setRedirect] = useState(false);
  const [ready, setReady] = useState(false);
  const { app, auth, game } = state;
  const { lang } = app;
  const { authenticated } = auth;
  const { current } = game;
  const { id:socket = false } = listener;

  const params = new URLSearchParams(search);
  const code = params.get('code') || false;

  const disabled = (ready && authenticated !== false) || code !== false;

  const mobile = { size: 12 };

  useEffect(() => {
    if(socket !== false){
      getAppId(dispatch)
        .then(getted => checkUser(dispatch, socket)
          .then(checked => {
            setReady(getted && !checked);
          }))
    }
  }, [dispatch, socket]);

  useEffect(() => {
    const { from = {} } = history;
    const { pathname =  routes.getLink('index') } = from;
    const link = current === false ? pathname : routes.getLink('game');
    if(authenticated !== false) {
      setRedirect(link);
    }
  }, [dispatch, history, authenticated, current])


  if(redirect !== false) {
    return <Redirect to={redirect} />
  }

  return (
    <Columns centered className='is-vcentered is-mobile'>
      <Columns.Column desktop={{ size: 6 }} tablet={{ size:8 }} mobile={mobile} >
        <Logo />
      </Columns.Column>
      <Separator />
      <Columns.Column desktop={{ size: 5, offset: 1 }} tablet={{ size: 8 }} mobile={mobile} >
        <LoginForm
          disabled={disabled}
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
