import { gameAction } from '../constants/action.constant';
import { game } from '../constants/states.constant';

export default (state = game, action = {}) => {
  switch (action.type) {
    case gameAction.set_current:
      return { ...state, current: action.data, info: action.data === false ? {} : state.info }
    case gameAction.set_info:
      return { ...state, info: action.data }
    default:
      return state;
  }
};
