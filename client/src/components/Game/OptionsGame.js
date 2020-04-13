import React  from 'react';
import { Columns, Content } from 'react-bulma-components';

import { translate } from 'react-translate';


import Button from '../utils/Button';;

export default translate('game')(({ t, auth, info, onStart, onCancel }) => {
  const { players, private:isPrivate, user } = info;
  let buttonEnable = false;
  let text = t('waiting');
  let color = 'warning';
  if(isPrivate && players.length > 1) {
    color = 'success';
    text = t('wait_start');
    if(user === auth) {
      buttonEnable = true;
    }
  }
  return (
    <Columns className='is-mobile'>
      <Columns.Column mobile={{ size: 4 }}>
        <Button color='danger' onClick={onCancel} >
          {t('cancel')}
        </Button>
      </Columns.Column>
      <Columns.Column mobile={{ size: 7, offset: 1 }}>
        {
          buttonEnable
          ? (
              <Button color='success' onClick={onStart} >
                {t('start')}
              </Button>
            )
          : (
              <Content className={`state-game has-background-${color} has-text-centered has-text-weight-bold`}>
                {text}
              </Content>
            )
        }
      </Columns.Column>
    </Columns>
  );
});
