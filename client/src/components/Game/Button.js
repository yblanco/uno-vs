import React from 'react';
import { Button } from 'react-bulma-components';
import { translate } from 'react-translate';


export default translate('game')(({ t, text, onClick=()=>{}, disabled, color='success' }) => (
  <Button color={color}  onClick={onClick} disabled={disabled}>
    {t(text)}
  </Button>
));
