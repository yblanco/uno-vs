import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

import ShareButton from './ShareButton';

export default translate('game')(({ t, code, share = true }) => {
  return (
    <Columns className='is-mobile is-vcentered has-text-centered info-contact has-background-white is-size-7 game-code'>
      <Columns.Column size={2}  className='has-text-weight-bold'>
        {t('code')}:
      </Columns.Column>
      <Columns.Column size={3} className='has-text-weight-light has-text-centered'>
        {code.toUpperCase()}
      </Columns.Column>
      <Columns.Column size={1}>
        <ShareButton type='copy' code={code} />
      </Columns.Column>
      {
        share && (
          ['facebook', 'twitter', 'telegram', 'whatsapp'].map((rrss, index) => (
            <Columns.Column key={rrss} size={1} offset={index === 0 ? 1 : null} >
              <ShareButton type={rrss} code={code} />
            </Columns.Column>
          ))
        )
      }
    </Columns>
  );
});
