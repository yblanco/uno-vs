import { userAction } from '../constants/action.constant';
import dispatchAction from './action';
import userRest from '../apis/user.api';

import { showSnackbarError } from './snackbar.action';


export const getRanking = (dispatch, id) => {
  const data = { id };
  return userRest.rank(data)
    .catch(err => {
      showSnackbarError(dispatch, err);
    })
}


export const changeStateUser = (dispatch, data) => {
  const { id, online } = data;
  if (online) {
    dispatch(dispatchAction(userAction.on_user, id))
  } else {
    dispatch(dispatchAction(userAction.off_user, id))
  }
}

export const updateRankGlobal = (dispatch, ranks) => {
  dispatch(dispatchAction(userAction.get_rank_global, ranks));
}

export const updateRankFriend = (dispatch, ranks) => {
  dispatch(dispatchAction(userAction.get_rank_friends, ranks));
}

export const searchUser = (dispatch, id, string) => {
  const data = { string, id };
  return userRest.search(data)
    .then(({ searched }) => searched)
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    })
}

export const addFriend = (dispatch, id, user) => {
  const data = { user, id };
  return userRest.addFriend(data)
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    })
}

export const rejectFriend = (dispatch, id, user) => {
  const data = { user, id };
  return userRest.rejectFriend(data)
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    })
}

export const blockFriend = (dispatch, id, user) => {
  const data = { user, id };
  return userRest.blockFriend(data)
    .catch(err => {
      showSnackbarError(dispatch, err);
      return false;
    })
}
