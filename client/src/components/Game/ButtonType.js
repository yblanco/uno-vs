import React  from 'react';
import { Content } from 'react-bulma-components';

import { translate } from 'react-translate';

import Icons from '../Icons';


export default translate('game')(({ t, type = 'private', active, onClick }) => {
  const types = {
    private: {
      background: 'info',
      text: 'friends'
    },
    world: {
      background: 'warning',
      text: 'inline'
    }
  }
  const { [type]:current } = types;
  const isActive = active === type;
  const size = isActive ? 96 : 64;
  return (
    <Content onClick={() => onClick(type)}>
      {t(current.text)}
      <Content className={`btn-type-content pointer has-background-${current.background} ${isActive && 'active'}`}>
        <Icons type={type} size={size} />
      </Content>
    </Content>

  );
})
