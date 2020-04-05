import React from 'react';
import { Image, Columns } from 'react-bulma-components';


import en from './langs/en.png';
import es from './langs/es.png';

const langs = {
  en: {
    flag: en,
    name: 'English',
  },
  es: {
    flag: es,
    name: 'Español',
  }
}


const Header = ({ lang }) => {
  const item = langs[lang];
  return (
    <Columns className="is-mobile is-vcentered">
      <Columns.Column size={3}>
        <Image src={item.flag} alt={item.name} size={24} />
      </Columns.Column>
      <Columns.Column size={9} className="has-text-centered">
        {item.name}
      </Columns.Column>
    </Columns>
  )
}

export default Header;
