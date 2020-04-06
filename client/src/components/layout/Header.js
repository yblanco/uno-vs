import React from 'react';
import { Columns, Image } from 'react-bulma-components';
import Select from 'react-select';
import { translate } from "react-translate";


import Lang from './Lang';

import logout from './logout.png';

import './header.css';

export default translate('header')(({ t, lang, setLang, auth, loggedOut }) => {
  const options = [
    { value: 'en', label: <Lang lang='en' /> },
    { value: 'es', label: <Lang lang='es' /> },
  ];
  const value = options.find(item => item.value === lang);
  const offsetMobile = auth === false ? 7 : 3;
  const offsetTablet = auth === false ? 7 : 3;
  const offsetDesktop = auth === false ? 7 : 6;

  return (
    <Columns className='is-mobile header'>
      {
        auth !== false && (
          <Columns.Column
            mobile={{ size: 4 }}
            tablet={{ size: 1 }}
            desktop={{ size: 1 }}
            className='pointer'
            onClick={loggedOut}
          >
            <Image src={logout} alt='Logout' />
          </Columns.Column>
        )
      }
      <Columns.Column
        mobile={{size: 5, offset: offsetMobile}}
        tablet={{size: 5, offset: offsetTablet}}
        desktop={{size: 5, offset: offsetDesktop}}
      >
        <Select
          classNamePrefix='lang'
          isSearchable={false}
          autoFocus={false}
          value={value}
          onChange={(option) => setLang(option.value)}
          options={options}
          placeholder={t('language')}
        />
      </Columns.Column>
    </Columns>
  )
});
