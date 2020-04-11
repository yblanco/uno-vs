import React, { useState } from 'react';
import { Columns, Form } from 'react-bulma-components';

import { translate } from 'react-translate';

import TitleForm from '../utils/TitleForm';
import Icons from '../Icons';


export default translate('game')(({ t, onClick }) => {
  const length = 6;
  const [code, setCode] = useState('');
  const onChange = (e) => {
    const { target } = e;
    const { value } = target;
    if(value.length <= length){
      setCode(value.replace(/[^a-z0-9_]/gi, ''));
    }
  }
  const onJoin = () => {
    if(code.length === length) {
      onClick(code);
    }
  }
  return (
    <Columns className='is-mobile'>
      <Columns.Column size={12}>
        <TitleForm>
          {t('join_game')}
        </TitleForm>
      </Columns.Column>
      <Columns.Column mobile={{ size: 12 }} className='has-background-white'>
        <Columns className='is-mobile is-vcentered'>
          <Columns.Column mobile={{ size: 2 }} className='has-text-weight-bold'>
            {t('code')}
          </Columns.Column>
          <Columns.Column mobile={{ size: 7 }}>
            <Form.Input value={code} onChange={onChange} />
          </Columns.Column>
          <Columns.Column
            mobile={{ size: 3 }}
            className={`form-code ${code.length === length ? 'pointer' : 'not-allowed no-active'}`}
            onClick={onJoin}
          >
            <Icons type='join' size={48} />
          </Columns.Column>
        </Columns>
      </Columns.Column>
    </Columns>
  );
});
