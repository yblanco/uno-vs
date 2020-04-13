import { userAction } from '../constants/action.constant';
import dispatchAction from './action';
import userRest from '../apis/user.api';

import { showSnackbarError } from './snackbar.action';


export const getRanking = (dispatch, id) => {
  const data = { id };
  return userRest.rank(data)
    .then(response => {
      const { ranks = [] } = response;
      dispatch(dispatchAction(userAction.get_rank, ranks));
    })
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

export const updateAllRankUser = (dispatch, ranks) => {
  dispatch(dispatchAction(userAction.get_rank, ranks));
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
