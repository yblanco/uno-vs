import React, { useContext, useEffect } from 'react';

import { Container } from 'react-bulma-components';

import { Redirect } from 'react-router-dom';

import { TranslatorProvider } from 'react-translate';

import events, { connect, disconnect } from './socket';

import { Store } from './reducers';
import { Routes } from './routes';

import Snackbar from './components/layout/Snackbar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import Home from './pages/Home';

import { hideSnackbar } from './actions/snackbar.action';

import { setLang, getLangStorage } from './actions/app.action';

import { getAppId, checkUser, loggedOut, clientDisconnect } from './actions/auth.action';

import { onLineUser, offLineUser } from './actions/user.action';

import en from './i18n/en.json';
import es from './i18n/es.json';

import './app.css';

const translate = { en, es };

const App = () => {
  const { state, dispatch } = useContext(Store);
  const { snackbar, app, auth } = state;
  const { ready, lang } = app;
  const { authenticated } = auth;

  const { location } = window;
  const { search = "", pathname = "/" } = location;
  const isHome = pathname === "/";
  const params = new URLSearchParams(search);
  const language = params.get('lang') || 'en';
  const { [lang]:translations } = translate;
  const redirect = params.get('redirect') || '/index';


  useEffect(() => {
    const onConnect = (data) => onLineUser(dispatch, data);
    const offConnect = (data) => offLineUser(dispatch, data);
    connect(events.on_connect, onConnect);
    connect(events.on_disconnect, offConnect);
    return () => {
      clientDisconnect(dispatch);
      disconnect(events.on_connect, onConnect);
      disconnect(events.on_disconnect, offConnect);
    }
  }, [dispatch]);


  useEffect(() => {
    const langStorage = getLangStorage() || language;
    getAppId(dispatch);
    setLang(dispatch, langStorage);
  }, [dispatch, language]);

  useEffect(() => {
    if(ready === true) {
      checkUser(dispatch);
    }
  }, [dispatch, ready])

  if(authenticated !== false && isHome) {
    return (<Redirect to={{ pathname: redirect }} />);
  }

  return (
    <div className="app home">
      <TranslatorProvider translations={translations}>
        <Snackbar info={snackbar} hideSnackbar={() => hideSnackbar(dispatch)} />
        <Header
          auth={authenticated}
          lang={lang}
          setLang={(value) => setLang(dispatch, value)}
          loggedOut={() => loggedOut(dispatch, authenticated) }
        />
        <Container fluid>
          {
            authenticated === false
            ? <Home />
            : <Routes />
          }
        </Container>
        <Footer home={isHome} />
      </TranslatorProvider>
    </div>
  );
};

export default App;
