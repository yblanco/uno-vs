import { gameAction } from '../constants/action.constant';
import dispatchAction from './action';
import gameRest from '../apis/game.api';

import { perPage } from '../constants/app.constant';

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
  dispatch(dispatchAction(gameAction.set_current, code));
}

export const getGame = (dispatch, id) => {
  const data = { id };
  return gameRest.get(data)
    .then(response => {
      const { code } = response;
      const info = code === false ? {} : response;
      setCode(dispatch, code);
      changeInfo(dispatch, info);
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

export const startGame = (dispatch, id) => {
  const data = { id };
  return gameRest.start(data)
    .then(response => {
      return true;
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    });
}

export const joinGame = (dispatch, id, code) => {
  const data = { id, code };
  return gameRest.join(data)
    .then(response => {
      return true;
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    });
}

export const getGames = (dispatch, id, page = 1) => {
  const from = (page - 1) * perPage;
  const to = from + perPage;
  const data = { id, from, to };
  return gameRest.games(data)
    .then(response => {
      const { all, total } = response;
      dispatch(dispatchAction(gameAction.set_globals, all))
      return parseInt(Math.ceil(total/perPage), 10);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    });
}
