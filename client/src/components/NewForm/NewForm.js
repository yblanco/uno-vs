import React, { useState } from 'react';
import { Columns, Form, Button } from 'react-bulma-components';

import { translate } from 'react-translate';

import { maxPlayers, minBet } from '../../constants/app.constant';

import Icons from '../Icons';
import TitleForm from '../utils/TitleForm';
import Switch from '../utils/Switch';


export default translate('game')(({ t, user }) => {
  const type1 = { value: 'world', text: t('world') };
  const type2 = { value: 'private', text: t('private') };
  const [type, setType] = useState(type1);
  const [players, setPlayers] = useState(4);
  const [bet, setBet] = useState(minBet);
  const { money } = user;
  const canEdit = (max, value, min = 0) => ((value <= max && value > min )|| value === '')
  const onChangePlayer = (e) => {
    const { target } = e;
    const { value } = target;
    if(canEdit(maxPlayers, value)){
      setPlayers(value);
    }
  }
  const onChangeBet = (e) => {
    const { target } = e;
    const { value } = target;
    if(canEdit(money, value)){
      setBet(value);
    }
  }
  return (
    <Columns className='is-mobile is-vcentered title-inner has-text-centered'>
      <Columns.Column size={12}>
        <TitleForm title={t('new_game')} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        <Icons type='money' size={64} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 9 }}>
        <Form.Input type='number' value={bet} onChange={onChangeBet} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        <Icons type='people' size={64} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 9 }}>
        <Form.Input type='number' value={players} onChange={onChangePlayer} />
      </Columns.Column>
      <Columns.Column size={12}>
        <Switch
          first={type1}
          second={type2}
          active={type}
          onChange={setType}
        />
      </Columns.Column>
      <Columns.Column size={12}>
        <Button color='success' disabled >
          {t('create')}
        </Button>
      </Columns.Column>
    </Columns>
  );
});
