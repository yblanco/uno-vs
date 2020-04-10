import React, { useContext, useState } from 'react';
import { Columns } from 'react-bulma-components';
import { Redirect } from 'react-router';

import routes from '../routes';

import { Store } from '../reducers';

import TitleInner from '../components/utils/TitleInner';
import NewForm from '../components/Game/NewForm';

import { createGame } from '../actions/game.action';

export default () => {
  const { state, dispatch } = useContext(Store);
  const [created, setCreated] = useState(false);
  const { auth } = state;
  const { authenticated } = auth;

  const onSave = (data) => {
    return createGame(dispatch, data, authenticated)
      .then(() => {
        setCreated(true);
      });
  }

  if(created) {
    return <Redirect to={routes.getLink('game')} />
  }

  return (
    <Columns className='is-mobile'>
      <Columns.Column size={12}>
        <TitleInner route='index' user={authenticated} />
      </Columns.Column>
      <Columns.Column>
        <NewForm user={authenticated} onSave={onSave} />
      </Columns.Column>
    </Columns>
  );
};
