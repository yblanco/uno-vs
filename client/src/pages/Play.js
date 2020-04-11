import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { Store } from '../reducers';

export default () => {
  const { state } = useContext(Store);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { id, name } = authenticated;
  const { info, current } = game;
  const { bet, cant, players } = info;

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
