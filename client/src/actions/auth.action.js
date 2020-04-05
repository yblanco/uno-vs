import { authAction } from '../constants/action.constant';
import dispatchAction from './action';
import authRest from '../apis/auth.api';

import { setReady } from './app.action';
import { showSnackbarError, showSnackbarSuccess } from './snackbar.action';

import { KEY_STORAGE } from '../constants/env.constant';

const setLogged = (response) => {
  const { encoded = "" } = response;
  if(encoded !== "") {
    localStorage.setItem(KEY_STORAGE, encoded);
  }
}

const removeLogged = () => {
  localStorage.removeItem(KEY_STORAGE);
}

const login = (dispatch, response) => {
  const { name } = response;
  setLogged(response);
  dispatch(dispatchAction(authAction.set_user, response));
  showSnackbarSuccess(dispatch, name);
}

export const getAppId = (dispatch) => {
  authRest.getAppId()
    .then(response => {
      const { id } = response;
      dispatch(dispatchAction(authAction.set_app_id, id));
      dispatch(dispatchAction(authAction.checked_user));
      setReady(dispatch);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    })
};

export const authUser = (dispatch, data) => {
  authRest.auth(data)
    .then(response => {
      login(dispatch, response);
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    });
}

export const checkUser = (dispatch, logged) => {
  authRest.checkUser(logged)
    .then(response => {
      login(dispatch, response);
    })
    .catch(err => {
      removeLogged();
      dispatch(dispatchAction(authAction.checked_user));
    })
}
