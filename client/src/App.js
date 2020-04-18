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
import { loggedOut, updateAuth, setBells } from './actions/auth.action';
import { setCode } from './actions/game.action';

import en from './i18n/en.json';
import es from './i18n/es.json';

import './app.css';

const translate = { en, es };

const App = () => {
  const { state, dispatch } = useContext(Store);
  const { snackbar, app, auth, game } = state;
  const { lang } = app;
  const { authenticated, bells } = auth;
  const { info } = game;
  const { state:stateGame = '' } = info;

  const { location } = window;
  const { search = '' } = location;
  const params = new URLSearchParams(search);
  const language = params.get('lang');
  const { [lang]:translations } = translate;

  useEffect(() => {
    const onConnect = (message) => console.log('CONNECT',message);
    const onDisconnect = (message) => console.log('DISCONNECT',message);
    const onReconect = (message) => console.log('RECONNECT',message);
    connect(events.connected, onConnect);
    connect(events.disconnected, onDisconnect);
    connect(events.reconnecting, onReconect);    return () => {
      disconnect(events.connected, onConnect);
      disconnect(events.disconnected, onDisconnect);
      disconnect(events.reconnecting, onReconect);
    }
  }, [dispatch]);

  useEffect(() => {
    const { id = '' } = authenticated;
    const code_event = `${events.set_code}_${id}`;
    const bell_event = `${events.set_bells}_${id}`;
    const eventCode = ({ code }) => setCode(dispatch, code);
    const eventAuth = (user) => updateAuth(dispatch, user)
    const eventBell = (newBells) => setBells(dispatch, newBells);
    connect(code_event, eventCode);
    connect(bell_event, eventBell);
    connect(id, eventAuth);
    return () => {
      disconnect(code_event, eventCode);
      disconnect(bell_event, eventBell);
      disconnect(id, eventAuth);
    }
  }, [dispatch, authenticated]);

  useEffect(() => {
    const langStorage = language === null ? getLangStorage() : language;
    setLang(dispatch, langStorage || lang);
  }, [dispatch, language, lang]);

  return (
    <div className='app home'>
      <TranslatorProvider translations={translations}>
        <Snackbar info={snackbar} hideSnackbar={() => hideSnackbar(dispatch)} />
        {
          stateGame !== 'playing' && (
            <Header
              auth={authenticated}
              lang={lang}
              bell={bells.length}
              setLang={(value) => setLang(dispatch, value)}
              loggedOut={() => loggedOut(dispatch, listener.id) }
            />
          )
        }
        <Container fluid>
          <Content>
            <Routes auth={authenticated} />
          </Content>
        </Container>
          {
            authenticated === false && (
              <Footer />
            )
          }
      </TranslatorProvider>
    </div>
  );
};

export default App;
