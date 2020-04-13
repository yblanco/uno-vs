import { userAction } from '../constants/action.constant';
import { user } from '../constants/states.constant';

const changeUserState = (users, idUser, state = true) => {
  return users.map(user => {
    const current = user;
    const { id } = current;
    if(id === idUser) {
      current.online = state;
    }
    return current;
  });
}

export default (state = user, action = {}) => {
  let users = [];
  switch (action.type) {
    case userAction.get_rank_global:
      return {
        ...state, rank_global: action.data,
      };
    case userAction.get_rank_friends:
      return {
        ...state, rank_friends: action.data,
      };
    case userAction.on_user:
      users = changeUserState(state.rank_global, action.data)
      return {
        ...state, rank_global: users
      }
    case userAction.off_user:
      users = changeUserState(state.rank.global, action.data, false);
      return {
        ...state, rank_global: users
      }
    default:
      return state;
  }
};
