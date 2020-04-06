import React, { useState } from 'react';
import { Tabs, Content } from 'react-bulma-components';

import { translate } from "react-translate";

import RankingList from './RankingList';

import './ranking.css';

const steps = ['friends', 'global']

export default translate('ranking')(({ t, all, friends, auth }) => {
  const [active, setActive] = useState(steps[1]);
  const isFriend = active === steps[0];
  const list = isFriend ? friends : all;
  return (
    <Content className='rank-view'>
      <Tabs
        fullwidth={true}
        align="centered"
        className="ranking has-background-dark"
      >
        {
          steps.map(step => (
            <Tabs.Tab
              key={step}
              onClick={() => setActive(steps[1])}
              active={step === active}
              className={
                `${
                    step === active
                    ? 'has-text-dark has-background-white has-text-weight-bold'
                    : 'has-text-white'
                } has-text-centered
                ${
                  step === steps[0]
                  ? 'not-allowed has-text-grey'
                  : 'pointer'
                }`
              }
              renderAs="div"
            >
              {t(step)}
            </Tabs.Tab>
          ))
        }
      </Tabs>
      <RankingList ranks={list} auth={auth} />
    </Content>
  );
});
