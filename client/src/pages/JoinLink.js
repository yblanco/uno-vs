import React, { useContext, useEffect, useState } from 'react';
import { Columns } from 'react-bulma-components';

import { Redirect, useParams } from 'react-router';

import routes from '../routes';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';
import JoinGame from '../components/Game/JoinGame';

import { joinGame } from '../actions/game.action';

export default ({ }) => {
  const { state, dispatch } = useContext(Store);
  const [exist, setExist] = useState(true);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { id } = authenticated;
  const { current } = game;
  const { code } = useParams();
  const params = {};
  if(exist) {
    params.icon = false;
  }

  useEffect(() => {
    joinGame(dispatch, id, code)
      .then(result => {
        setExist(result);
      })
  }, [dispatch, id, code]);


  if(current !== false) {
    return <Redirect to={routes.getLink('game')} />
  }

  return (
    <Columns className='is-mobile'>
      <Columns.Column size={12}>
        <TitleInner route='index' user={authenticated} {...params} />
      </Columns.Column>
      <Columns.Column size={12}>
        <JoinGame code={code} exist={exist} />
      </Columns.Column>
    </Columns>
  );
};
