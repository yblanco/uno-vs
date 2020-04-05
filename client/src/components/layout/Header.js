import React from 'react';
import { Columns } from 'react-bulma-components';
import Select from 'react-select';
import { translate } from "react-translate";


import Lang from './Lang';

import './header.css';

export default translate('header')(({ t, lang, setLang }) => {
  const options = [
    { value: 'en', label: <Lang lang='en' /> },
    { value: 'es', label: <Lang lang='es' /> },
  ];
  const value = options.find(item => item.value === lang);
  return (
    <Columns className='is-mobile header'>
      <Columns.Column
        size={5}
        offset={7}
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
