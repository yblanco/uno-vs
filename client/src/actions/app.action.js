import { appAction } from '../constants/action.constant';
import dispatchAction from './action';

export const setReady = (dispatch) => {
  dispatch(dispatchAction(appAction.set_ready));
};

export const setLang = (dispatch, lang) => {
  dispatch(dispatchAction(appAction.change_language, lang));
};
