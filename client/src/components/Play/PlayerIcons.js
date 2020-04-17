import React from 'react';
import { Columns } from 'react-bulma-components';

import Icons from '../Icons';

import './play.css';

export default () => {

  return (
    <Columns className='is-mobile is-vcentered icons-play'>
      <Columns.Column>
        <Icons type='chat' size={24} />
      </Columns.Column>
      <Columns.Column>
        <Icons type='favchat' size={24} />
      </Columns.Column>
      <Columns.Column>
        <Icons type='stop' size={24} />
      </Columns.Column>
    </Columns>
  );
};
