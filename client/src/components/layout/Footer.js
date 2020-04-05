import React from 'react';
import { Footer, Content, Columns } from 'react-bulma-components';
import Moment from 'react-moment';
import { translate } from "react-translate";
import { Link } from 'react-router-dom';

import routes from '../../routes';


import './footer.css';

export default translate('footer')(({ t, home }) => (
  <Content>
    {home && (
      <Columns className="is-mobile is-mobile-footer">
        <Columns.Column size={6} className="has-text-centered">
          <Link to={routes.getLink()}>
            {t('terms')}
          </Link>
        </Columns.Column>
        <Columns.Column size={6} className="has-text-centered">
          <Link to={routes.getLink()}>
            {t('how_to')}
          </Link>
        </Columns.Column>
      </Columns>
    )}
    <Footer className="is-info notification">
        {t('right_reserverd')}
        {' '}
        <Moment format="Y" />
    </Footer>
  </Content>
));
