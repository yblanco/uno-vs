import React from 'react';
import { Heading, Icon } from 'react-bulma-components';
import CogsIcon from 'mdi-react/CogsIcon';
import TestTubeIcon from 'mdi-react/TestTubeIcon';


import { Link } from 'react-router-dom';
import routes from '../../config/routes.config';

import './title.css';

const Title = ({ app, environments, current }) => (
  <Heading size={4} className="title-app-name borderBottom">
    <Link to={routes.getLink('app', { id: app.id })} title="Setting">
      {app.name}
    </Link>
    {
        current.length > 0 && (
          <span>
            {' | '}
            <span className="breadcrumb">
              {
                current.map((item, i) => (<span key={item || i}>{item}</span>))
              }
            </span>
          </span>
        )
      }
    <Link to={routes.getLink('setting', { id: app.id })} title="Setting" className="icons">
      <Icon className="pointer" size="auto">
        <CogsIcon />
      </Icon>
    </Link>
    {
        environments > 0 && (
          <Link to={routes.getLink('test', { id: app.id })} title="Tests" className="icons">
            <Icon className="pointer" size="auto">
              <TestTubeIcon />
            </Icon>
          </Link>
        )
      }

  </Heading>
);

export default Title;
