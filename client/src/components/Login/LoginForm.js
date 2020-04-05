import React from 'react';
import { Columns } from 'react-bulma-components';

import { Link } from 'react-router-dom';

import { translate } from "react-translate";

import FacebookLogin from 'react-facebook-login';

import routes from '../../routes';

export default translate('login')(({ t, id, disabled=false, onLogin=()=>{} }) => {
  return (
    <Columns centered>
      <Columns.Column size={12}>
        {
          id !== false &&
          (
            <FacebookLogin
              appId={id}
              fields="name,email,picture"
              callback={onLogin}
              language="es"
              textButton={t('sign_in')}
              isDisabled={disabled}
            />
          )
        }
      </Columns.Column>
      <Columns.Column size={12} className="has-text-centered">
        <Link to={routes.getLink()}>
          {t('as_guest')}
        </Link>
      </Columns.Column>
    </Columns>
  );
});
