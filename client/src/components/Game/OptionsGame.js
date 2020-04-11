import React  from 'react';
import { Columns, Content } from 'react-bulma-components';

import { translate } from 'react-translate';

import { gameStatesColor } from '../../constants/app.constant';

import Button from './Button';

export default translate('game')(({ t, info, onCancel }) => {
  const { state, players, private:isPrivate } = info;
  const { [state]:stateColor } = gameStatesColor;
  let buttonEnable = false;
  if(isPrivate && players.length > 1) {
    buttonEnable = true;
  }
  return (
    <Columns className='is-mobile'>
      <Columns.Column mobile={{ size: 4 }}>
        <Button text='cancel' color='danger' onClick={onCancel} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 7, offset: 1 }}>
        {
          buttonEnable
          ? <Button text='start' color={stateColor} />
          : (
              <Content className={`state-game has-background-${stateColor} has-text-centered has-text-weight-bold`}>
                {t(state)}
              </Content>
            )
        }
      </Columns.Column>
    </Columns>
  );
});
