import React from 'react';
import { Columns } from 'react-bulma-components';

import Icons from '../Icons';

import './play.css';

export default () => {

  return (
    <Columns className='is-mobile is-vcentered icons-play'>
      <Columns.Column size={3}>
        <Icons type='chat' size={24} className='pointer' />
      </Columns.Column>
      <Columns.Column size={3}>
        <Icons type='favchat' size={24} className='pointer' />
      </Columns.Column>
      <Columns.Column size={3} offset={3}>
        <Icons type='stop' size={24} className='pointer' />
      </Columns.Column>
    </Columns>
  );
};
