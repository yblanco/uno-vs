import { authAction } from '../constants/action.constant';
import dispatchAction from './action';
import authRest from '../apis/auth.api';

import { showSnackbarError, showSnackbarSuccess } from './snackbar.action';
import { setCode } from './game.action';
import { setAppSetting } from './app.action';


import { KEY_STORAGE } from '../constants/env.constant';

const setLogged = (response) => {
  const { encoded = false } = response;
  if(encoded !== false) {
    localStorage.setItem(KEY_STORAGE, encoded);
  }
}

const removeLogged = () => {
  localStorage.removeItem(KEY_STORAGE);
}

const getLogged = () => (localStorage.getItem(KEY_STORAGE));

const login = (dispatch, response) => {
  const { name, picture, id, money, diamonds, online, code, encoded, level, friends_confirmed, friends_request, requested_friends, friends_blocked, friends } = response;
  const user = { name, picture, id, money, diamonds, online, encoded, level, friends_confirmed, friends_request, requested_friends, friends_blocked, friends };
  setLogged(user);
  setCode(dispatch, code);
  updateAuth(dispatch, user);
  showSnackbarSuccess(dispatch, name);
}

export const getAppId = (dispatch) => {
  return authRest.getAppId()
    .then(response => {
      dispatch(dispatchAction(authAction.set_app_id, response));
      setAppSetting(dispatch, response);
      return true;
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    })
};

export const authUser = (dispatch, data, id) => {
  return authRest.auth(data, id)
    .then(response => {
      login(dispatch, response);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
      showSnackbarError(dispatch, err);
    });
}

export const checkUser = (dispatch, id) => {
  const logged = getLogged();
  if(logged !== null) {
    return authRest.checkUser(logged, id)
      .then(response => {
        login(dispatch, response);
        return true;
      })
      .catch(err => {
        removeLogged();
        setCode(dispatch, false);
        showSnackbarError(dispatch, err);
        return false;
      })
  }
  return Promise.resolve(false);
}

export const loggedOut = (dispatch, id) => {
  return authRest.logout(id)
    .then(() => {
      removeLogged();
      updateAuth(dispatch, false);
      setCode(dispatch, false);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    });
}

export const updateAuth = (dispatch, auth) => {
  dispatch(dispatchAction(authAction.set_authenticated, auth));
}

export const setRankUser = (dispatch, rank) => {
  dispatch(dispatchAction(authAction.set_rank, rank));
}
