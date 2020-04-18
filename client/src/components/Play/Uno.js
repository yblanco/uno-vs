import React from 'react';
import { Content } from 'react-bulma-components';

import Icons from '../Icons';

import './play.css';

export default ({ t }) => {
  return (
    <Content className='pointer play-uno-scream'>
      <Icons type='uno' size={96}/>
    </Content>
  );
};
