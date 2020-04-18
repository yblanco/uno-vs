import React from 'react';
import { Columns } from 'react-bulma-components';
import Select from 'react-select';
import { translate } from 'react-translate';

import Lang from './Lang';
import Icons from '../Icons';
import BadgetFloat from '../utils/BadgetFloat';


import './header.css';

export default translate('header')(({ t, lang, setLang, auth, bell=0, loggedOut }) => {
  const options = [
    { value: 'en', label: <Lang lang='en' /> },
    { value: 'es', label: <Lang lang='es' /> },
  ];
  const value = options.find(item => item.value === lang);
  const offsetMobile = auth === false ? 7 : null;
  const offsetTablet = auth === false ? 7 : 5;
  const offsetDesktop = auth === false ? 7 : 5;

  return (
    <Columns className='is-mobile header is-vcentered'>
      {
        auth !== false && (
          [
            (
              <Columns.Column
                mobile={{ size: 2 }}
                tablet={{ size: 1 }}
                desktop={{ size: 1 }}
                className='pointer'
                onClick={loggedOut}
                key='logout-btn'
              >
                <Icons type='logout' size={32} />
              </Columns.Column>
            ),
            (
              <Columns.Column
                mobile={{ size: 2, offset: 3 }}
                tablet={{ size: 1, offset: offsetTablet }}
                desktop={{ size: 1, offset: offsetDesktop }}
                className='pointer is-parent-badget'
                key='bell-icon'
              >
                <Icons type='bell' size={32} />
                <BadgetFloat cant={bell} />
              </Columns.Column>
            ),
          ]
        )
      }
      <Columns.Column
        mobile={{size: 5, offset: offsetMobile}}
        tablet={{size: 5 }}
        desktop={{size: 5 }}
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
