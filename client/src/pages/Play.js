import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { Redirect } from 'react-router';
import routes from '../routes';

import { Store } from '../reducers';

export default () => {
  const { state } = useContext(Store);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { id, name } = authenticated;
  const { info, current = false } = game;
  const { bet, cant, players = [] } = info;

  if(current === false) {
    return (<Redirect to={routes.getLink('new_game')} />);
  }

  return (
    <Columns className='is-vcentered'>
      Hola, {name} ({id})
      <br />
      Código: {current}
      <br/ >
      Apuesta: {bet}
      <br/>
      Jugadores: {cant}
      <hr />
      <br />
      {
        players.map(player => <div>{player.name}</div>)
      }
    </Columns>
  );
};
