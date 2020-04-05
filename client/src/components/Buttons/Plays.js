import React  from 'react';
import { Card } from 'react-bulma-components';

import { translate } from "react-translate";


import newGame from './new.png';
import joinGame from './join.png';

import './plays.css';

const plays = {
  new: {
    icon: newGame,
    label: 'new_game',
  },
  join: {
    icon: joinGame,
    label: 'join_game',
  },
}

export default translate('plays')(({ t, type }) => {
  const { [type]:play } = plays;
  return (
    <Card className='pointer plays'>
     <Card.Image size="square" src={play.icon} alt={type} />
     <Card.Content className="has-text-centered has-text-weight-bold has-text-white">
      {t(play.label)}
     </Card.Content>
    </Card>
  );
});
