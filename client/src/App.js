import React, { useContext, useEffect } from 'react';

import { Container } from 'react-bulma-components';

import { Redirect } from 'react-router-dom';

import { TranslatorProvider } from 'react-translate';

import events, { connect, disconnect, listener } from './socket';

import { Store } from './reducers';
import { Routes } from './routes';

import Snackbar from './components/layout/Snackbar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import Home from './pages/Home';

import { hideSnackbar } from './actions/snackbar.action';

import { setLang, getLangStorage } from './actions/app.action';

import { getAppId, checkUser, loggedOut } from './actions/auth.action';

import { changeStateUser } from './actions/user.action';

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
    const changeState = (data) => changeStateUser(dispatch, data);
    const onConnect = (message) => console.log("CONNECT",message);
    const onDisconnect = (message) => console.log("DISCONNECT",message);
    const onReconect = (message) => console.log("RECONNECT",message);

    connect(events.change_state, changeState);
    connect(events.connected, onConnect);
    connect(events.disconnected, onDisconnect);
    connect(events.reconnecting, onReconect);
    return () => {
      disconnect(events.change_state, changeState);
      disconnect(events.connected, onConnect);
      disconnect(events.disconnected, onDisconnect);
      disconnect(events.reconnecting, onReconect);
    }
  }, [dispatch]);


  useEffect(() => {
    const langStorage = getLangStorage() || language;
    getAppId(dispatch);
    setLang(dispatch, langStorage);
  }, [dispatch, language]);

  useEffect(() => {
    if(ready === true) {
      checkUser(dispatch, listener.id);
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
          loggedOut={() => loggedOut(dispatch, listener.id) }
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
