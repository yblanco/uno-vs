import { authAction } from '../constants/action.constant';
import { auth } from '../constants/states.constant';

export default (state = auth, action = {}) => {
  switch (action.type) {
    case authAction.set_app_id:
      return {
        ...state, app_id: action.data,
      };
    case authAction.set_authenticated:
      return {
        ...state, login: true, authenticated: action.data,
      }
    case authAction.checked_authenticated:
      return { ...state, check: true }
    default:
      return state;
  }
};
