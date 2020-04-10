import React, { useState, useEffect, useContext } from 'react';
import { Columns } from 'react-bulma-components';
import { Redirect } from 'react-router';

import routes from '../routes';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';
import InfoGame from '../components/Game/InfoGame';
import Players from '../components/Game/Players';
import Button from '../components/Game/Button';

import { getGame, cancelGame } from '../actions/game.action';


export default () => {
  const { state, dispatch } = useContext(Store);
  const [existGame, setExistGame] = useState(true);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { current } = game;
  const { id } = authenticated;
  const { info } = game;
  const { players = [] } = info;

  const onCancel = () => {
    return cancelGame(dispatch, id)
      .then((cancel) => {
        setExistGame(!cancel);
      });
  }

  useEffect(() => {
    getGame(dispatch, id)
      .catch(() => {
        setExistGame(false);
      })
  }, [dispatch, id]);


  if(!existGame) {
    return (<Redirect to={routes.getLink('index')} />);
  }

  return (
    <Columns className='is-vcentered'>
      <Columns.Column size={12}>
        <TitleInner
          user={authenticated}
          onClick={onCancel}
          icon='cancel'
        />
      </Columns.Column>
      <Columns.Column size={12}>
        <InfoGame game={info} />
      </Columns.Column>
      <Columns.Column size={12}>
        <Players game={info} />
      </Columns.Column>
      <Columns.Column size={12}>
        <Button text='start' disabled={true}/>
      </Columns.Column>
    </Columns>
  );
};
