import React from 'react';
import { Columns } from 'react-bulma-components';

import Modal from '../utils/Modal';

export default ({ onLeft }) => {

  return (
    <Columns className='is-mobile is-vcentered title-inner'>
      <Columns.Column
        mobile={{ size: 3 }}
        desktop={{ size: 2 }}
        className='pointer'
        icon="error"
      >
        <Modal>
          ¿Desea Abandonar la partida?
          <div onClick={onLeft} className='has-background-danger'>Sí</div>
        </Modal>
      </Columns.Column>
    </Columns>
  );
};
