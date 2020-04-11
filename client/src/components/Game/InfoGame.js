import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import Icons from '../Icons';
import ShareButton from './ShareButton';

export default translate('game')(({ t, game, onCancel }) => {
  const { code, bet = 0, cant = 0, private:isPrivate, players = [] } = game;
  return (
    <Columns className='is-mobile is-vcentered has-background-grey-light has-text-weight-bold'>
      <Columns.Column mobile={{ size: 2 }} tablet={{ size: 1 }} desktop={{ size: 1 }}>
        <Icons type='money' size={32} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }} tablet={{ size: 2 }} desktop={{ size: 2 }}>
        {String(bet).padStart(5, 0)}
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} tablet={{ size: 1 }} desktop={{ size: 1 }}>
        <Icons type='people' size={32} />
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }} tablet={{ size: 2 }} desktop={{ size: 2 }}>
        {players.length}/{cant}
      </Columns.Column>
      <Columns.Column mobile={{ size: 2 }} tablet={{ size: 1 }} desktop={{ size: 1 }}>
        <Icons type={isPrivate ? 'private' : 'world'} size={32} />
      </Columns.Column>
      <Columns.Column
        mobile={{ size: 12 }}
        tablet={{ size: 5 }}
        desktop={{ size: 5 }}
        className="has-background-white is-size-7 game-code"
      >
        <Columns className='is-mobile is-vcentered has-text-centered info-contact'>
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
