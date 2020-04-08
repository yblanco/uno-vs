import React  from 'react';

import { translate } from 'react-translate';

export default translate('user')(({ t, user }) => {
  const { name, online = false } = user;
  const status = online === true ? 'online' : 'offline'
  return (
    <span className='has-text-white has-text-weight-bold'>
      {name}
      {' '}
      <span className={`status-user is-size-7 has-text-success ${status}`}>
        {t(status)}
      </span>
    </span>
  )
});
