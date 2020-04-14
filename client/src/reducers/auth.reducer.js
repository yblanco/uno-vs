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
    case authAction.set_rank:
      return {
        ...state, rank: action.data,
      }
    case authAction.set_bell:
      return {
        ...state, bells: action.data,
      }
    default:
      return state;
  }
};
