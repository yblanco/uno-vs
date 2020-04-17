import React from 'react';
import { Container } from 'react-bulma-components';

import BadgetFloat from '../utils/BadgetFloat';
import CardsBlock from './CardsBlock';


import './play.css';

export default ({ cards }) => {
  return (
    <Container className='is-parent-badget'>
      <BadgetFloat cant={cards} key='badget' />
      <CardsBlock cards={cards} />
    </Container>
  );
};
