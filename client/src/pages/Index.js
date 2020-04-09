import React, { useEffect, useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import { Link } from 'react-router-dom';
import routes from '../routes';

import events, { connect, disconnect } from '../socket';

import { Store } from '../reducers';

import UserInfo from '../components/User/UserInfo';
import New from '../components/Buttons/New';
import Join from '../components/Buttons/Join';
import Friends from '../components/Buttons/Friends';

import Ranking from '../components/Ranking/Ranking';

import { getRanking, updateAllRankUser, changeStateUser } from '../actions/user.action';
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
    const updateAllRank = (data) => updateAllRankUser(dispatch, data);
    const changeState = (data) => changeStateUser(dispatch, data);
    connect(events.update_all_rank, updateAllRank);
    connect(events.change_state, changeState);
    return () => {
      disconnect(events.update_all_rank, updateAllRank);
      disconnect(events.change_state, changeState);
    }
  }, [dispatch]);

  useEffect(() => {
    getRanking(dispatch, authenticated);
  }, [dispatch, authenticated]);


  return (
    <Columns className='is-mobile is-flex-desktop-only is-vcentered'>
      <Columns.Column size={12}>
        <UserInfo user={authenticated} auth={id} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 4 }} tablet={{ size: 4 }} desktop={{ size: 2 }} >
        <Link to={routes.getLink('new_game')}>
          <New />
        </Link>
      </Columns.Column>
      <Columns.Column mobile={{ size: 4 }} tablet={{ size: 4 }} desktop={{ size: 2 }} >
        <Join onClick={onClick} />
      </Columns.Column>
      <Columns.Column className="off" mobile={{ size: 4 }} tablet={{ size: 4 }} desktop={{ size: 2 }} >
        <Friends />
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }} >
        <Ranking all={all} friends={friends} auth={id} />
      </Columns.Column>
    </Columns>
  );
});
