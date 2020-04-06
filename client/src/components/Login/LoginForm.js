import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from "react-translate";

import FacebookLogin from 'react-facebook-login';

// import { Link } from 'react-router-dom';
//
// import routes from '../../routes';

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
        <span className='not-allowed has-text-grey-light'>
          {t('as_guest')}
        </span>
      </Columns.Column>
    </Columns>
  );
});
