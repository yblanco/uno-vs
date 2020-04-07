import { userAction } from '../constants/action.constant';
import { user } from '../constants/states.constant';

export default (state = user, action = {}) => {
  let users = [];
  switch (action.type) {
    case userAction.get_rank:
      return {
        ...state, rank: { friends: state.rank.friends, global: action.data },
      };
    case userAction.on_user:
      users = state.rank.global.map(user => {
        const current = user;
        if(current.id === action.data) {
          current.online = true;
        }
        return current;
      });
      return {
        ...state, rank: { friends: state.rank.friends, global: users }
      }
    default:
      return state;
  }
};
