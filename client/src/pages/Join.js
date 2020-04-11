import React, {  useContext, useEffect, useState } from 'react';
import { Columns } from 'react-bulma-components';

import { Redirect } from 'react-router';

import routes from '../routes';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';

import JoinCode from '../components/Game/JoinCode';
import GameList from '../components/Game/GameList';


import { joinGame, getGames } from '../actions/game.action';

export default () => {
  const { state, dispatch } = useContext(Store);
  const [loaded, setLoaded] = useState(false);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { id } = authenticated;
  const { current, globals } = game;

  const onChange = (page) => getGames(dispatch, id, page)

  const onJoin = (code) => {
    joinGame(dispatch, id, code);
  }

  useEffect(() => {
    getGames(dispatch, id)
      .then((total) => setLoaded(total));
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
        <GameList games={globals} loaded={loaded} onChange={onChange} />
      </Columns.Column>
    </Columns>
  );
};
