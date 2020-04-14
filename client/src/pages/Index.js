import React, { useEffect, useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { Link } from 'react-router-dom';
import routes from '../routes';

import events, { connect, disconnect } from '../socket';

import { Store } from '../reducers';

import UserInfo from '../components/User/UserInfo';
import New from '../components/Buttons/New';
import Join from '../components/Buttons/Join';
import Social from '../components/Buttons/Social';

import Ranking from '../components/Ranking/Ranking';

import BadgetFloat from '../components/utils/BadgetFloat';

import { getRanking, updateRankGlobal, updateRankFriend, changeStateUser } from '../actions/user.action';
import { setRankUser } from '../actions/auth.action';

export default () => {
  const { state, dispatch } = useContext(Store);
  const { auth, user } = state;
  const { authenticated, rank } = auth;
  const { id, friends_request:requests } = authenticated;
  const { rank_global:all, rank_friends: friends } = user;


  useEffect(() => {
    const updateRank = (data) => updateRankGlobal(dispatch, data);
    const changeState = (data) => changeStateUser(dispatch, data);

    connect(events.update_ranks, updateRank);
    connect(events.change_state, changeState);
    return () => {
      disconnect(events.update_ranks, updateRank);
      disconnect(events.change_state, changeState);
    }
  }, [dispatch]);

  useEffect(() => {
    getRanking(dispatch, id);
    const updateRank = (data) => updateRankFriend(dispatch, data);
    const changeRankUSer = (data) => setRankUser(dispatch, data);

    const rank_event_friends = `${events.update_friend_ranks}_${id}`;
    const rank_event_user = `${events.update_user_ranks}_${id}`;
    connect(rank_event_friends, updateRank);
    connect(rank_event_user, changeRankUSer);
    return () => {
      disconnect(rank_event_friends, updateRank);
      disconnect(rank_event_user, changeRankUSer);
    }
  }, [dispatch, id]);


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
        <Link to={routes.getLink('join')}>
          <Join />
        </Link>
      </Columns.Column>
      <Columns.Column mobile={{ size: 4 }} tablet={{ size: 4 }} desktop={{ size: 2 }} className='is-parent-badget'>
        <Link to={routes.getLink('social')}>
          <Social />
        </Link>
        <BadgetFloat cant={requests.length} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }} tablet={{ size: 12 }} desktop={{ size: 6 }} >
        <Ranking all={all} friends={friends} auth={authenticated} rank={rank} />
      </Columns.Column>
    </Columns>
  );
};
