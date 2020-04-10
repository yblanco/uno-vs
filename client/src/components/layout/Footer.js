import React from 'react';
import { Footer, Content, Columns } from 'react-bulma-components';
import Moment from 'react-moment';
import { translate } from 'react-translate';
// import { Link } from 'react-router-dom';
//
// import routes from '../../routes';

import './footer.css';
/*
  <Link to={routes.getLink()}/>
*/

export default translate('footer')(({ t, home }) => (
  <Content>
    <Columns className='is-mobile is-mobile-footer'>
      <Columns.Column size={6} className='has-text-centered'>
        <span className='not-allowed has-text-grey-light'>
          {t('terms')}
        </span>
      </Columns.Column>
      <Columns.Column size={6} className='has-text-centered'>
        <span className='not-allowed has-text-grey-light'>
          {t('how_to')}
        </span>
      </Columns.Column>
    </Columns>
    <Footer className='is-info notification'>
        {t('right_reserverd')}
        {' '}
        <Moment format='Y' />
    </Footer>
  </Content>
));
