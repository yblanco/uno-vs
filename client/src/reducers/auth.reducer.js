import { authAction } from '../constants/action.constant';
import { auth } from '../constants/states.constant';


export default (state = auth, action = {}) => {
  switch (action.type) {
    case authAction.set_app_id:
      return {
        ...state, facebook_id: action.data.facebook, google_id: action.data.google,
      };
    case authAction.set_authenticated:
      return {
        ...state, login: true, authenticated: action.data,
      }
    default:
      return state;
  }
};
