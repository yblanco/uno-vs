import { snackbarAction } from '../constants/action.constant';
import dispatchAction from './action';

export const showSnackbarSuccess = (dispatch, text) => {
  dispatch(dispatchAction(snackbarAction.show, { text, type: 'success' }));
};

export const showSnackbarError = (dispatch, err) => {
  dispatch(dispatchAction(snackbarAction.show, { text: err.message, type: 'danger' }));
};

export const showSnackbarWarning = (dispatch, text) => {
  dispatch(dispatchAction(snackbarAction.show, { text, type: 'warning' }));
};

export const hideSnackbar = (dispatch) => {
  dispatch(dispatchAction(snackbarAction.hide));
};
