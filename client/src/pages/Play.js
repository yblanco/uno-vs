import React, { useContext, useEffect, useState } from 'react';
import { Columns } from 'react-bulma-components';

import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import routes from '../routes';

import { connect, disconnect } from '../socket';

import { Store } from '../reducers';

import { leftGame, changeInfo } from '../actions/game.action';

export default () => {
  const { state, dispatch } = useContext(Store);
  const [finish, setFinish] = useState(false);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { name, id, picture } = authenticated;
  const { info, current = false } = game;
  const { bet, cant, players = [], left = [], reward, state:stateGame, winner } = info;

  const onLeft = () => {
    leftGame(dispatch, id);
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
    if(stateGame === 'finished'){
      setFinish(true);
    }
  }, [dispatch, stateGame]);

  if(current === false) {
    return (<Redirect to={routes.getLink('new_game')} />);
  }
  return (
    <Columns className='is-vcentered'>
      Hola, {name} <img src={picture} width={15} alt={name} />
      <br />
      Código: {current}
      <br/ >
      Apuesta c/u: {bet}
      <br/>
      Premio: {reward}
      <br/>
      Jugadores: {cant}
      <hr />
      <br />
      <ul>
      {
        players.map(player => (
          <li key={player.id}>
            <img src={player.picture} width={15} alt={player.name} /> {player.name} | {player.money} | {
              left.find(item => item === player.id) !== undefined ? 'Abandonó' : 'En juego'
            }
          </li>
        ))
      }
      </ul>
      <div className='has-background-danger pointer' onClick={onLeft} >
        Abandonar Partida
      </div>
      {
        finish && (
          <div>
            Finalizó - Ganó: {winner.name || 'nop'} |
            <Link className='has-background-success' to={routes.getLink('index')}>IR A INICIO</Link>
          </div>
        )
      }
    </Columns>
  );
};
