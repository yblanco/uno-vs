import React  from 'react';
import { Columns } from 'react-bulma-components';

import { Link } from 'react-router-dom';
import routes from '../../routes';

import { translate } from 'react-translate';

import Icons from '../Icons';

export default translate('game')(({ t, games }) => {
  return (
    <Columns className='has-text-white list-game'>
      {
        games.length > 0
        ?
          games.map(game => (
            <Columns key={game.code} className='is-mobile has-text-white is-vcentered list-game-items'>
              <Columns.Column mobile={{ size: 3 }}>
                {game.code}
              </Columns.Column>
              <Columns.Column mobile={{ size: 1 }}>
                <Icons type='people' size={24} />
              </Columns.Column>
              <Columns.Column mobile={{ size: 2 }}>
                {game.players.length}/{game.cant}
              </Columns.Column>
              <Columns.Column mobile={{ size: 1 }}>
                <Icons type='money' size={24} />
              </Columns.Column>
              <Columns.Column mobile={{ size: 2 }}>
                {game.bet}
              </Columns.Column>
              <Columns.Column mobile={{ size: 3 }}>
                <Link to={routes.getLink('join_link', { code: game.code })}>
                  <Icons type='join' size={32} />
                </Link>
              </Columns.Column>
            </Columns>
          )
        )
        : (
          <Columns.Column size={12}>
            {t('no_game_found')}
          </Columns.Column>
        )
      }
    </Columns>
);
});
