import { appAction } from '../constants/action.constant';
import dispatchAction from './action';

import { KEY_STORAGE_LANG } from '../constants/env.constant';


export const getLangStorage = (lang) => {
  return localStorage.getItem(KEY_STORAGE_LANG);
}

const setLangStorage = (lang) => {
  localStorage.setItem(KEY_STORAGE_LANG, lang);
}

export const removeLangStorage = () => {
  localStorage.removeItem(KEY_STORAGE_LANG);
}

export const setReady = (dispatch) => {
  dispatch(dispatchAction(appAction.set_ready));
};

export const setLang = (dispatch, lang) => {
  setLangStorage(lang);
  dispatch(dispatchAction(appAction.change_language, lang));
};
