import React, { useEffect, useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { Store } from '../reducers';

export default () => {
  const { state, dispatch } = useContext(Store);
  const { auth, game } = state;
  const { authenticated } = auth;
  const { id } = authenticated;
  const { info, current } = game;

  return (
    <Columns className='is-vcentered'>
      Aquí vas a jugar {authenticated.name}
    </Columns>
  );
};
