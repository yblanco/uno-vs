import React  from 'react';
import { Columns, Content } from 'react-bulma-components';

import { translate } from 'react-translate';

import Icons from '../Icons';

import CodeShow from './CodeShow';

export default ({ code, exist }) => (
    <Columns>
      <Columns.Column size={12}>
        <CodeShow code={code} share={false} />
      </Columns.Column>
      <Columns.Column size={12}>
        <Icons type={exist ? 'loading' : 'error'} size='square' />
      </Columns.Column>
    </Columns>
);
