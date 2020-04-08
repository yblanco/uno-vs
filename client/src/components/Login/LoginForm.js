import React from 'react';
import { Columns } from 'react-bulma-components';

import { translate } from "react-translate";

import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';


// import { Link } from 'react-router-dom';
//
// import routes from '../../routes';

export default translate('login')(({ t, facebook, google, lang, socket, disabled=false, onLogin=()=>{}, onError=()=>{} }) => {
  const mapFields = (name, email, picture, id, from) => ({ name, email, picture, id, from });
  const loginFacebook = (response) => {
    const { status = false, name, email, picture = {}, id } = response;
    const { url = false } = picture.data || {};
    if(status === false) {
      onLogin(mapFields(name, email, url, id, 'facebook'), socket);
    } else {
      onError(t('facebook_error'));
    }
  }
  const loginGoogle = (response) => {
    const { profileObj = {} } = response;
    const { name, email, imageUrl, googleId } = profileObj;
    onLogin(mapFields(name, email, imageUrl, googleId, 'google'), socket);
  }
  return (
    <Columns centered>
      <Columns.Column size={12}>
        {
          facebook !== false &&
          (
            <FacebookLogin
              appId={facebook}
              fields="name,email,picture"
              callback={loginFacebook}
              language={lang}
              textButton={t('sign_in_facebook')}
              isDisabled={disabled}
            />
          )
        }
      </Columns.Column>
      <Columns.Column>
        {
          google !== false &&
          (
            <GoogleLogin
              clientId={google}
              buttonText={t('sign_in_google')}
              onSuccess={loginGoogle}
              onFailure={() => onError(t('google_error'))}
              disabled={disabled}
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
