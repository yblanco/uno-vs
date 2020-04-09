import React, { useContext, useEffect } from 'react';

import { Container, Content } from 'react-bulma-components';

import { TranslatorProvider } from 'react-translate';

import events, { connect, disconnect, listener } from './socket';

import { Store } from './reducers';
import { Routes } from './routes';

import Snackbar from './components/layout/Snackbar';
import Footer from './components/layout/Footer';
import Header from './components/layout/Header';

import { hideSnackbar } from './actions/snackbar.action';

import { setLang, getLangStorage } from './actions/app.action';
import { getAppId, loggedOut } from './actions/auth.action';

import en from './i18n/en.json';
import es from './i18n/es.json';

import './app.css';

const translate = { en, es };

const App = () => {
  const { state, dispatch } = useContext(Store);
  const { snackbar, app, auth } = state;
  const { lang } = app;
  const { authenticated } = auth;

  const { location } = window;
  const { search = "" } = location;
  const params = new URLSearchParams(search);
  const language = params.get('lang') || 'en';
  const { [lang]:translations } = translate;

  useEffect(() => {
    const onConnect = (message) => console.log("CONNECT",message);
    const onDisconnect = (message) => console.log("DISCONNECT",message);
    const onReconect = (message) => console.log("RECONNECT",message);

    connect(events.connected, onConnect);
    connect(events.disconnected, onDisconnect);
    connect(events.reconnecting, onReconect);
    return () => {
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
          <Content>
            <Routes auth={authenticated} />
          </Content>
        </Container>
        <Footer home={authenticated === false} />
      </TranslatorProvider>
    </div>
  );
};

export default App;
