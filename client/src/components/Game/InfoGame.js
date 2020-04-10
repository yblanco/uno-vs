import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import { gameStatesColor } from '../../constants/app.constant';

import Icons from '../Icons';
import ShareButton from './ShareButton';

export default translate('game')(({ t, game, onCancel }) => {
  const { code, state:gameState='waiting', bet = 0, cant = 0, private:isPrivate, players = [] } = game;
  const { [gameState]:gameStateColor } = gameStatesColor;
  return (
    <Columns className='is-mobile is-vcentered has-background-grey-light has-text-weight-bold'>
      <Columns.Column size={12} className={`has-background-${gameStateColor} has-text-centered has-text-centered`}>
        <Columns className='is-mobile is-vcentered'>
          <Columns.Column onClick={onCancel} size={2} className={`pointer`} >
            <Icons type='cancel' size={32} />
          </Columns.Column>
          <Columns.Column size={10}>
            {t(gameState)}
          </Columns.Column>
        </Columns>
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
        {players.length}/{cant}
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }}>
        <Icons type={isPrivate ? 'private' : 'world'} size={32} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }} className="has-background-white is-size-7 game-code">
        <Columns className='is-mobile is-vcentered has-text-centered'>
          <Columns.Column size={2}>
            {t('code')}:
          </Columns.Column>
          <Columns.Column size={3} className='has-text-weight-light'>
            {code}
          </Columns.Column>
          {
            ['facebook', 'twitter', 'telegram', 'whatsapp'].map((rrss, index) => (
              <Columns.Column key={rrss} size={1} offset={index === 0 ? 2 : null}>
                <ShareButton type={rrss} code={code} />
              </Columns.Column>
            ))
          }
        </Columns>
      </Columns.Column>
    </Columns>
  );
});
