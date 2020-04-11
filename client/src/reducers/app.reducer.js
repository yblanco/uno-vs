import { appAction } from '../constants/action.constant';
import { app } from '../constants/states.constant';

export default (state = app, action = {}) => {
  switch (action.type) {
    case appAction.change_language:
      return {
        ...state, lang: action.data
      }
    default:
      return state;
  }
};
