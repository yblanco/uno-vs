import React from 'react';
import { Tag } from 'react-bulma-components';




export default ({ position }) => {
  let color = '';
  switch (position) {
    case 1:
      color='gold';
      break;
    case 2:
      color = 'silver';
      break;
    case 3:
      color = 'bronze';
      break;
    default:
      color = 'loser'
  }
  return (
    <Tag className={`rank-position ${color}`}>
      {position}
    </Tag>
  );
};
