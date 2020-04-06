import { userAction } from '../constants/action.constant';
import { user } from '../constants/states.constant';

export default (state = user, action = {}) => {
  switch (action.type) {
    case userAction.get_rank:
      return {
        ...state, rank: { friends: state.rank.friends, global: action.data },
      };
    default:
      return state;
  }
};
