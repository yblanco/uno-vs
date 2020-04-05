import { snackbarAction } from '../constants/action.constant';
import { snackbar } from '../constants/states.constant';

export default (state = snackbar, action = {}) => {
  switch (action.type) {
    case snackbarAction.show:
      return {
        ...state, show: true, text: action.data.text, type: action.data.type,
      };
    case snackbarAction.hide:
      return { ...state, show: false };
    default:
      return state;
  }
};
