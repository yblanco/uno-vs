import React, { useState } from 'react';
import {  Content, Columns, Heading } from 'react-bulma-components';

import { translate } from 'react-translate';

import RankingList from './RankingList';
import Icons from '../Icons';
import Switch from '../utils/Switch';

import './ranking.css';

export default translate('ranking')(({ t, all, friends, auth, rank }) => {
  const type1 = { value: 'world', text: t('world') };
  const type2 = { value: 'friends', text: t('friends') };
  const [type, setType] = useState(type1);
  const list = type.value === type1.value ? all : friends;
  return (
    <Content className='rank-view'>
      <Columns className='is-mobile is-vcentered has-background-dark header-rank'>
        <Columns.Column
          mobile={{ size: 2 }}
          tablet={{ size: 3 }}
          desktop={{ size: 2 }}
        >
          <Icons type='ranking' size={48} />
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 4 }}
          tablet={{ size: 5 }}
          desktop={{ size: 5 }}
        >
          <Heading size={4} className='has-text-white'>
            {t('ranking')}
          </Heading>
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 6 }}
          tablet={{ size: 4 }}
          desktop={{ size: 5 }}
        >
        <Switch
          first={type1}
          second={type2}
          active={type}
          onChange={setType}
          size={24}
        />
        </Columns.Column>
      </Columns>
      <RankingList ranks={list} auth={auth} rank={rank} />
    </Content>
  );
});
