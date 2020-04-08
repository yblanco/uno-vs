import React  from 'react';
import { Card } from 'react-bulma-components';

import { translate } from "react-translate";


import newGame from './new.png';
import joinGame from './join.png';
import friends from './friends.png';


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
  friends: {
    icon: friends,
    label: false,
    class: 'not-allowed'
  }
}

export default translate('plays')(({ t, type, onClick }) => {
  const { [type]:play } = plays;
  return (
    <Card
      className={`${play.class === undefined ? 'pointer' : play.class} plays`}
      onClick={onClick}
    >
     <Card.Image size="square" src={play.icon} alt={type} />
     {
       play.label !== false && (
         <Card.Content className="has-text-centered has-text-weight-bold has-text-white">
          {t(play.label)}
         </Card.Content>
       )
     }
    </Card>
  );
});
