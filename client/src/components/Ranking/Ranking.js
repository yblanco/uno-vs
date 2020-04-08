import React from 'react';
import { Image, Content, Columns, Heading } from 'react-bulma-components';

import { translate } from 'react-translate';

import RankingList from './RankingList';

import ranking from './ranking.png';

import './ranking.css';

export default translate('ranking')(({ t, all, friends, auth }) => {
  const list = all;
  return (
    <Content className='rank-view'>
      <Columns className='is-mobile is-vcentered has-background-dark header-rank'>
        <Columns.Column
          mobile={{ size: 2 }}
          tablet={{ size: 3 }}
          desktop={{ size: 2 }}
        >
          <Image src={ranking} alt='ranking' />
        </Columns.Column>
        <Columns.Column
          mobile={{ size: 5 }}
          tablet={{ size: 7 }}
          desktop={{ size: 10 }}
        >
          <Heading size={4} className='has-text-white'>
            {t('ranking')}
          </Heading>
        </Columns.Column>
      </Columns>
      <RankingList ranks={list} auth={auth} />
    </Content>
  );
});
