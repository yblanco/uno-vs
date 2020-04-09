import React  from 'react';
import { Image } from 'react-bulma-components';

import level from './level.png';
import diamonds from './diamonds.png';
import money from './money.png';
import people from './people.png';
import privateIcon from './private.png';
import world from './world.png';



const stats = {
  level,
  diamonds,
  money,
  people,
  private: privateIcon,
  world
};

export default ({ type, size=16 }) => {
  return (
    <Image size={size} alt={type} src={stats[type]} />
  );
};
