import React  from 'react';
import { Content } from 'react-bulma-components';


import Icons from '../Icons';

export default ({ type, onClick, active }) => {
  const classCursor = active ? 'pointer active' : 'not-allowed no-active';
  return (
    <Content onClick={() => onClick(type)} className={`form-bet ${classCursor}`} >
      <Icons type={type} size={32}/>
    </Content>
  );
}
