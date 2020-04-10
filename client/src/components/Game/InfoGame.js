import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import { gameStatesColor } from '../../constants/app.constant';

import Icons from '../Icons';

export default translate('game')(({ t, game }) => {
  const { user, code, state:gameState='waiting', bet = 0, cant, private:isPrivate, players } = game;
  const { [gameState]:gameStateColor } = gameStatesColor;
  return (
    <Columns className='is-mobile is-vcentered has-background-grey-light has-text-weight-bold'>
      <Columns.Column size={12} className={`has-background-${gameStateColor} has-text-centered has-text-centered`}>
        {t(gameState)}
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }}>
        <Icons type='money' size={32} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        {String(bet).padStart(5, 0)}
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }}>
        <Icons type='people' size={32} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        {cant}
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }}>
        <Icons type={isPrivate ? 'private' : 'world'} size={32} />
      </Columns.Column>
    </Columns>
  );
});
