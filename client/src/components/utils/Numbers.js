import React  from 'react';

export default ({ number, pad }) => (
  <span className='has-text-weight-bold'>
    {String(number).padStart(pad, 0)}
  </span>
);
