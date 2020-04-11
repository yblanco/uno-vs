import { gameAction } from '../constants/action.constant';
import dispatchAction from './action';
import gameRest from '../apis/game.api';

import { showSnackbarError } from './snackbar.action';


export const createGame = (dispatch, game, user) => {
  const { id } = user;
  const data = { ...game, id };
  return gameRest.create(data)
    .then(response => {
      const { code } = response;
      setCode(dispatch, code);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    });
}

export const setCode = (dispatch, code) => {
  dispatch(dispatchAction(gameAction.set_current, code))
}

export const getGame = (dispatch, id) => {
  const data = { id };
  return gameRest.get(data)
    .then(response => {
      const { code } = response;
      if(code === false){
        setCode(dispatch, false)
        throw new Error('no_game')
      }
      changeInfo(dispatch, response)
    });
}

export const changeInfo = (dispatch, info) => {
  const { user, code, state, bet, cant, private: isPrivate, players } = info;
  dispatch(dispatchAction(gameAction.set_info, { user, code, state, bet, cant, private: isPrivate, players }));
}

export const cancelGame = (dispatch, id) => {
  const data = { id };
  return gameRest.cancel(data)
    .then(response => {
      return true;
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    });
}
