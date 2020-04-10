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
      const { user, code, state, bet, cant, private: isPrivate, players } = response;
      const info = { user, code, state, bet, cant, private: isPrivate, players };
      if(code === false){
        dispatch(dispatchAction(gameAction.set_current, false))
        throw new Error('no_game')
      }
      dispatch(dispatchAction(gameAction.set_info, info));
    });
}

export const cancelGame = (dispatch, id) => {
  const data = { id };
  return gameRest.cancel(data)
    .then(response => {
      console.log(response)
      return true;
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    });
}
