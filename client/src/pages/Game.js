import React, { useEffect, useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { Redirect } from 'react-router';
import routes from '../routes';

import { connect, disconnect } from '../socket';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';
import InfoGame from '../components/Game/InfoGame';
import Players from '../components/Game/Players';
import OptionsGame from '../components/Game/OptionsGame';

import { getGame, cancelGame, changeInfo, startGame } from '../actions/game.action';


export default () => {
  const { state, dispatch } = useContext(Store);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { id } = authenticated;
  const { info, current } = game;
  const { state:stateGame } = info;

  const onCancel = () => {
    return cancelGame(dispatch, id);
  }

  const onStart = () => {
    startGame(dispatch, id);
  }

  useEffect(() => {
    const onChangeGame = (data) => changeInfo(dispatch, data);
    if(current !== false) {
      connect(current, onChangeGame);
      return () => {
        disconnect(current, onChangeGame);
      }
    }
  }, [dispatch, current]);

  useEffect(() => {
    getGame(dispatch, id);
  }, [dispatch, id]);

  useEffect(() => {
    const { cant, players = [], user, state:stateGame } = info;
    if(cant === players.length && user === id && stateGame === 'waiting') {
      startGame(dispatch, id);
    }
  }, [dispatch, info, id])


  if(current === false) {
    return (<Redirect to={routes.getLink('new_game')} />);
  } else if (stateGame === 'playing') {
    return (<Redirect to={routes.getLink('play')} />);
  }

  return (
    <Columns className='is-vcentered'>
      <Columns.Column size={12}>
        <TitleInner
          user={authenticated}
          icon={false}
        />
      </Columns.Column>
      <Columns.Column size={12}>
        <InfoGame game={info} onCancel={onCancel} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }} tablet={{ size: 8, offset: 2 }}>
        <Players game={info} />
      </Columns.Column>
      <Columns.Column size={12}>
        <OptionsGame info={info} auth={id} onCancel={onCancel} onStart={onStart} />
      </Columns.Column>
    </Columns>
  );
};
