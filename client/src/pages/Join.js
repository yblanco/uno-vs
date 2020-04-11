import React, {  useContext, useEffect } from 'react';
import { Columns } from 'react-bulma-components';

import { Redirect } from 'react-router';

import routes from '../routes';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';

import JoinCode from '../components/Game/JoinCode';

import { joinGame, getGames } from '../actions/game.action';

export default () => {
  const { state, dispatch } = useContext(Store);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { id } = authenticated;
  const { current, globals } = game;

  const onJoin = (code) => {
    joinGame(dispatch, id, code);
  }

  useEffect(() => {
    getGames(dispatch, id)
  }, [dispatch, id])



  if(current !== false) {
    return <Redirect to={routes.getLink('game')} />
  }

  return (
    <Columns className='is-mobile'>
      <Columns.Column size={12}>
        <TitleInner route='index' user={authenticated} />
      </Columns.Column>
      <Columns.Column size={12}>
        <JoinCode onClick={onJoin} />
      </Columns.Column>
      <Columns.Column size={12}>
        {
          globals.map(item => (
            <div>{item.code}</div>
          ))
        }
      </Columns.Column>
    </Columns>
  );
};
