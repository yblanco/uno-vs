import React from 'react';
import { Tag } from 'react-bulma-components';

export default ({ cant = 0, float = true, ...props }) => (
  cant > 0 && (
    <Tag color='info' {...props} className={`badget ${float ? 'float' : 'fixed'}`} >
      {cant}
    </Tag>
  )
);
