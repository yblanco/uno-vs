import React  from 'react';

import Icons from '../Icons';

export default ({ type, onClick, active }) => {
  const classCursor = active ? 'pointer active' : 'not-allowed no-active';
  return (
    <div onClick={() => onClick(type)} className={`form-bet ${classCursor}`} >
      <Icons type={type} size={32}/>
    </div>
  );
}
