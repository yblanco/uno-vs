import React from 'react';
import { Content } from 'react-bulma-components';

import Icons from '../Icons';


import './play.css';

export default ({ cards }) => (
  <Content>
    {
      Array(cards > 9 ? 9 : cards).fill(' ').map((card, i) => (
        <Icons
          key={i}
          style={{right: `${(i/5)+1}em` }}
          type='card'
          size={16}
          className='card-play'
        />
      ))
    }
  </Content>
);
