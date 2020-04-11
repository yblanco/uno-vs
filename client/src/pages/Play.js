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
      Hola, {name}
      <br />
      Código: {current}
      <br/ >
      Apuesta: {bet}
      <br/>
      Jugadores: {cant}
      <hr />
      <br />
      <ul>
      {
        players.map(player => <li>{player.name}</li>)
      }
      </ul>
    </Columns>
  );
};
