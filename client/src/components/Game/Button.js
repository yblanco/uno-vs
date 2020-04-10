import React from 'react';
import { Button } from 'react-bulma-components';
import { translate } from 'react-translate';


export default translate('game')(({ t, text, onClick=()=>{}, disabled }) => (
  <Button color='success'  onClick={onClick} disabled={disabled}>
    {t(text)}
  </Button>
));
