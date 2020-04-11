import React from 'react';
import { Heading } from 'react-bulma-components';

import './utils.css';

export default ({ children }) => (
  <Heading size={4} className='title-form has-text-left'>
    {children}
    <div className='has-background-white' />
  </Heading>
);
