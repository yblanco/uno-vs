import React from 'react';
import { Columns } from 'react-bulma-components';

import Icons from '../Icons';

const langs = {
  en: 'English',
  es: 'Español',
}


const Header = ({ lang }) => {
  const { [lang]:item } = langs;
  return (
    <Columns className='is-mobile is-vcentered'>
      <Columns.Column size={3}>
        <Icons type={lang} size={24} />
      </Columns.Column>
      <Columns.Column size={9} className='has-text-centered'>
        {item}
      </Columns.Column>
    </Columns>
  )
}

export default Header;
