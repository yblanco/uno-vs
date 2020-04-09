import React from 'react';
import { Heading } from 'react-bulma-components';

import './utils.css';

export default ({ title }) => (
  <Heading size={4} className='title-form'>
    {title}
    <div className='has-background-white' />
  </Heading>
);
