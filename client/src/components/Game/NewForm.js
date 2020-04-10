import React, { useState } from 'react';
import { Columns, Form } from 'react-bulma-components';

import { translate } from 'react-translate';

import { maxPlayers, minBet, stats } from '../../constants/app.constant';

import Icons from '../Icons';
import TitleForm from '../utils/TitleForm';
import Switch from '../utils/Switch';
import Numbers from '../utils/Numbers';
import NumberPlayers from './NumberPlayers';
import Button from './Button';
import ButtonBet from './ButtonBet';


import './game.css';

export default translate('game')(({ t, user, onSave = () => {} }) => {
  const type1 = { value: 'world', text: t('world') };
  const type2 = { value: 'private', text: t('private') };
  const [type, setType] = useState(type1);
  const [players, setPlayers] = useState(4);
  const [bet, setBet] = useState(minBet);
  const [requesting, setRequesting] = useState(false);
  const [add, setAdd] = useState(true);
  const [less, setLess] = useState(true);
  const { money } = user;
  const canEdit = (max, value, min = 0) => (value <= max && value >= min);
  const onChangeBet = (type) => {
    let value = bet;
    setAdd(true);
    setLess(true);
    if(type === 'add') {
      value = bet * 2;
      if(canEdit(money, value)) {
        setBet(value);
        setAdd(true);
      } else {
        setAdd(false);
      }
    } else {
      value = parseInt(bet / 2, 10);
      if(canEdit(money, value, minBet)) {
        setBet(value);
        setLess(true);
      } else {
        setLess(false);
      }
    }
  }
  const onClick = () => {
    if(!requesting) {
      setRequesting(true);
      onSave({ players, bet, type: type.value })
        .then(() => setRequesting(false));
    }
  }
  return (
    <Columns className='is-mobile is-vcentered title-inner has-text-centered has-text-weight-bold'>
      <Columns.Column size={12}>
        <TitleForm title={t('new_game')} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        <Icons type='money' size={64} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} >
        <ButtonBet type='less' onClick={onChangeBet} active={less} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 5 }}>
        <Numbers number={bet} pad={stats.money.pad} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} >
        <ButtonBet type='add' onClick={onChangeBet} active={add} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        <Icons type='people' size={64} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }} >
        <NumberPlayers number={2} active={players} onClick={setPlayers} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }} >
        <NumberPlayers number={3} active={players}  onClick={setPlayers} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }} >
        <NumberPlayers number={4} active={players} onClick={setPlayers} />
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
        <Button text='create' onClick={onClick} disabled={requesting} />
      </Columns.Column>
    </Columns>
  );
});
