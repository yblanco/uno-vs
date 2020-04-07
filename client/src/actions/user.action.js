import { userAction } from '../constants/action.constant';
import dispatchAction from './action';
import userRest from '../apis/user.api';

import { showSnackbarError } from './snackbar.action';


export const getRanking = (dispatch, user) => {
  const { encoded = '' } = user;
  userRest.rank(encoded)
    .then(response => {
      const { ranks = [] } = response;
      dispatch(dispatchAction(userAction.get_rank, ranks));
    })
    .catch(err => {
      showSnackbarError(dispatch, err);
    })
}


export const onLineUser = (dispatch, id) => {
  dispatch(dispatchAction(userAction.on_user, id))
}
