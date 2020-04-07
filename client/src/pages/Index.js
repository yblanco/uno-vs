import React, { useEffect, useContext } from 'react';
import { Content, Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

// import { Link, Redirect } from 'react-router-dom';

// import routes from '../routes';

import events, { connect, disconnect } from '../socket';

import { Store } from '../reducers';

import UserInfo from '../components/User/UserInfo';
import New from '../components/Buttons/New';
import Join from '../components/Buttons/Join';
import Ranking from '../components/Ranking/Ranking';

import { getRanking, onLineUser } from '../actions/user.action';
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
    console.log(1)
    const onConnect = (data) => onLineUser(dispatch, data);
    connect(events.on_connect, onConnect);
    return () => {
      disconnect(events.on_connect, onConnect);
    }
  });


  useEffect(() => {
    getRanking(dispatch, authenticated);
  }, [dispatch, authenticated]);


  return (
    <Content>
      <Columns className='is-mobile is-flex-desktop-only'>
        <Columns.Column size={12}>
          <UserInfo user={authenticated} auth={id} />
        </Columns.Column>
        <Columns.Column size={12} className='has-background-white	divider'/>
        <Columns.Column
          mobile={{ size: 6 }}
          tablet={{ size: 6 }}
          desktop={{ size: 3 }}
        >
          <New onClick={onClick} />
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 6 }}
          tablet={{ size: 6 }}
          desktop={{ size: 3 }}
        >
          <Join onClick={onClick} />
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 12 }}
          tablet={{ size: 12 }}
          desktop={{ size: 6 }}
        >
          <Ranking all={all} friends={friends} auth={id} />
        </Columns.Column>
      </Columns>
    </Content>
  );
});
