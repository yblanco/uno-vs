import React, { useEffect, useContext } from 'react';
import { Content, Columns } from 'react-bulma-components';

import { translate } from "react-translate";

// import { Link, Redirect } from 'react-router-dom';

// import routes from '../routes';

import { Store } from '../reducers';

import UserInfo from '../components/User/UserInfo';
import New from '../components/Buttons/New';
import Join from '../components/Buttons/Join';
import Ranking from '../components/Ranking/Ranking';

import { getRanking } from '../actions/user.action';
import { showSnackbarWarning } from '../actions/snackbar.action';


export default translate('index')(({ t }) => {
  const { state, dispatch } = useContext(Store);
  const { auth, user } = state;
  const { authenticated } = auth;
  const { id } = authenticated;
  const { rank } = user;
  const { global:all, friends } = rank;

  const onClick = () => (showSnackbarWarning(dispatch, t('coming_soon')));

  useEffect(() => {
    getRanking(dispatch, authenticated);
  }, [dispatch, authenticated]);


  return (
    <Content>
      <Columns className='is-mobile'>
        <Columns.Column size={12}>
          <UserInfo user={authenticated} auth={id} />
        </Columns.Column>
        <Columns.Column size={12} className='has-background-white	divider'/>
        <Columns.Column size={6}>
          <New onClick={onClick} />
        </Columns.Column>
        <Columns.Column size={6}>
          <Join onClick={onClick} />
        </Columns.Column>
        <Columns.Column size={12}>
          <Ranking all={all} friends={friends} auth={id} />
        </Columns.Column>
      </Columns>
    </Content>
  );
});
