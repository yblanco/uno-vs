import React  from 'react';

import { translate } from 'react-translate';

export default translate('user')(({ t, user, auth }) => {
  const { id, name, online = false } = user;
  const status = online === true ? 'online' : 'offline'
  return (
    <div className='has-text-white has-text-weight-bold truncate'>
      <div className={`status-user ${status}`} />
      {' '}
      {
        id === auth
        ? t('me')
        : name
      }
    </div>
  )
});
