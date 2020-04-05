import { authAction } from '../constants/action.constant';
import { auth } from '../constants/states.constant';

export default (state = auth, action = {}) => {
  switch (action.type) {
    case authAction.set_app_id:
      return {
        ...state, app_id: action.data,
      };
    case authAction.set_user:
      return {
        ...state, login: true, user: action.data,
      }
    case authAction.checked_user:
      return { ...state, check: true }
    default:
      return state;
  }
};
