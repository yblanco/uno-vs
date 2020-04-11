import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import Icons from '../Icons';
import CodeShow from './CodeShow';

export default translate('game')(({ t, game, onCancel }) => {
  const { code = '', bet = 0, cant = 0, private:isPrivate, players = [] } = game;
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
      >
        <CodeShow code={code} />
      </Columns.Column>
    </Columns>
  );
});
