import React from 'react';
import { Button } from 'react-bulma-components';

export default ({ t, children, onClick=()=>{}, disabled, color='success', ...others }) => (
  <Button color={color}  onClick={onClick} disabled={disabled} {...others} >
    {children}
  </Button>
);
