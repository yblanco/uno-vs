import React, { useState } from 'react';
import { Columns } from 'react-bulma-components';

import Icons from '../Icons';

import './switch.css';

export default ({ first, second, active, onChange = () => {}, size=48 }) => {
  const [current, setCurrent] = useState(active.value === first.value);
  const getActive = (isActive) => isActive ? first : second;
  const activeItem = getActive(current);
  const classReverse =  current ? 'no-reverse' : 'reverse';
  const onClick = () => {
    const change = !current;
    setCurrent(change);
    onChange(getActive(change));
  }
  return (
    <Columns className='is-mobile is-vcentered switch-form pointer' onClick={onClick}>
      <Columns.Column mobile={{ size: 3 }}>
        <Icons type={first.value} size={size} />
      </Columns.Column>
      <Columns.Column
        mobile={{ size: 6 }}
        className={`switch has-background-white is-vcentered ${classReverse}`}
      >
        <div className='switch-selector has-background-info has-text-info' >
          .
        </div>
        <div className='switch-name has-text-weight-bold'>
          {activeItem.text}
        </div>
      </Columns.Column>
      <Columns.Column mobile={{ size: 3 }}>
        <Icons type={second.value} size={size} />
      </Columns.Column>
    </Columns>
  );
}
