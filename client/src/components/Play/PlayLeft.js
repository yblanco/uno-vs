import React from 'react';
import { Columns, Content } from 'react-bulma-components';
import { translate } from 'react-translate';

import Modal from '../utils/Modal';
import Button from '../utils/Button';


export default translate('play')(({ t, onLeft }) => {

  return (
    <Columns className='is-mobile is-vcentered title-inner'>
      <Columns.Column
        mobile={{ size: 3 }}
        desktop={{ size: 2 }}
        className='pointer'
      >
        <Modal icon='error'>
          <Content>{t('leave')}</Content>
          <Button onClick={onLeft}>{t('yes')}</Button>
        </Modal>
      </Columns.Column>
    </Columns>
  );
});
