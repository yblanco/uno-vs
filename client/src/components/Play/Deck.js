import React from 'react';
import { Container } from 'react-bulma-components';

import Icons from '../Icons';

import './play.css';

export default () => {
  return (
    <Container className='pointer'>
      {
        Array(3).fill(' ').map((card, i) => (
          <Icons
            key={i}
            style={{left: `${(i/5.5)}em`, bottom: 0 }}
            type='card'
            size={64}
            className='card-play'
          />
        ))
      }
    </Container>
  );
};
