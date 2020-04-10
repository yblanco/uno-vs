import { authAction } from '../constants/action.constant';
import dispatchAction from './action';
import authRest from '../apis/auth.api';

import { setReady } from './app.action';
import { showSnackbarError, showSnackbarSuccess } from './snackbar.action';
import { setCode } from './game.action';

import { KEY_STORAGE } from '../constants/env.constant';

const setLogged = (response) => {
  const { encoded = '' } = response;
  if(encoded !== '') {
    localStorage.setItem(KEY_STORAGE, encoded);
  }
}

const removeLogged = () => {
  localStorage.removeItem(KEY_STORAGE);
}

const getLogged = () => (localStorage.getItem(KEY_STORAGE));

const login = (dispatch, response) => {
  const { name, picture, id, money, diamonds, online, code, encoded, level } = response;
  const user = { name, picture, id, money, diamonds, online, encoded, level };
  setLogged(user);
  setCode(dispatch, code);
  dispatch(dispatchAction(authAction.set_authenticated, user));
  showSnackbarSuccess(dispatch, name);
}

export const getAppId = (dispatch) => {
  authRest.getAppId()
    .then(response => {
      dispatch(dispatchAction(authAction.set_app_id, response));
      dispatch(dispatchAction(authAction.checked_authenticated));
      setReady(dispatch);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    })
};

export const authUser = (dispatch, data, id) => {
  authRest.auth(data, id)
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
    authRest.checkUser(logged, id)
      .then(response => {
        login(dispatch, response);
      })
      .catch(err => {
        removeLogged();
        dispatch(dispatchAction(authAction.checked_authenticated));
        setCode(dispatch, false);
        showSnackbarError(dispatch, err);
      })
  }
}

export const loggedOut = (dispatch, id) => {
  return authRest.logout(id)
    .then(() => {
      removeLogged();
      dispatch(dispatchAction(authAction.set_authenticated, false));
      setCode(dispatch, false);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    });
}
