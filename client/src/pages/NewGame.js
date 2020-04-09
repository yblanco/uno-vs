import React, { useContext } from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from 'react-translate';

// import events, { connect, disconnect } from '../socket';

import { Store } from '../reducers';

import TitleInner from '../components/TitleInner';
import NewForm from '../components/NewForm/NewForm';

export default translate('game')(({ t }) => {
  const { state } = useContext(Store);
  const { auth } = state;
  const { authenticated } = auth;

  return (
    <Columns className='is-mobile'>
      <Columns.Column size={12}>
        <TitleInner route='index' user={authenticated} />
      </Columns.Column>
      <Columns.Column>
        <NewForm user={authenticated} />
      </Columns.Column>
    </Columns>
  );
});
