import React from 'react';
import { Content } from 'react-bulma-components';

import './play.css';

export default ({ color = 'neutral', card, me = false, ...props }) => {
  return (
    <Content className={`${me ? 'me' : 'they'} play-card ${color}`} {...props}>
      <Content className={`play-card-content`}>
        {card}
      </Content>
    </Content>
  );
};
