import React, { useState } from 'react';
import { Columns, Content } from 'react-bulma-components';

import { translate } from 'react-translate';

import { minBet, maxPlayers, stats } from '../../constants/app.constant';

import Icons from '../Icons';
import TitleForm from '../utils/TitleForm';
import Numbers from '../utils/Numbers';
import NumberPlayers from './NumberPlayers';
import Button from './Button';
import ButtonBet from './ButtonBet';
import ButtonType from './ButtonType';



import './game.css';

export default translate('game')(({ t, user, onSave = () => {} }) => {
  const types = ['private', 'world'];
  const [type, setType] = useState(types[0]);
  const [players, setPlayers] = useState(4);
  const [bet, setBet] = useState(minBet);
  const [requesting, setRequesting] = useState(false);
  const [add, setAdd] = useState(true);
  const [less, setLess] = useState(false);
  const { money } = user;
  const canEdit = (max, value, min = 0) => (value <= max && value >= min);
  const getNext = (type, value) => parseInt(type === 'add' ? (value * 2) : (value / 2), 10);
  const onChangeBet = (type) => {
    const value = getNext(type, bet);
    setAdd(getNext('add', value) <= money);
    setLess(getNext('less', value) >= minBet);
    if(canEdit(money, value, minBet)) {
      setBet(value)
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
      <Columns.Column mobile={{ size: 5 }} className='bet-show-column'>
        <Content className='bet-show has-background-grey-light'>
        <Numbers number={bet} pad={stats.money.pad} />
        </Content>
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} >
        <ButtonBet type='add' onClick={onChangeBet} active={add} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        <Icons type='people' size={64} />
      </Columns.Column>
      {
        Array(maxPlayers).fill('players').slice(0, maxPlayers-1)
          .map((item, index) => (
            <Columns.Column key={`${item}_${index}`} mobile={{ size: 3 }} >
              <NumberPlayers number={index + 2} active={players} onClick={setPlayers} />
            </Columns.Column>
          ))
      }
      <Columns.Column size={12} >
        <Columns className='is-mobile'>
          <Columns.Column size={6}>
            <ButtonType type={types[1]} onClick={setType} active={type} />
          </Columns.Column>
          <Columns.Column size={6}>
            <ButtonType type={types[0]} onClick={setType} active={type} />
          </Columns.Column>
        </Columns>
      </Columns.Column>
      <Columns.Column size={12}>
        <Button text='create' onClick={onClick} disabled={requesting} />
      </Columns.Column>
    </Columns>
  );
});
