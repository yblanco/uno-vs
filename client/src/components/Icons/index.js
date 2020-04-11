import React  from 'react';
import { Image } from 'react-bulma-components';

import level from './level.png';
import diamonds from './diamonds.png';
import money from './money.png';
import people from './people.png';
import privateIcon from './private.png';
import world from './world.png';
import back from './back.png';
import ranking from './ranking.png';
import logout from './logout.png';
import cancel from './cancel.png';
import add from './add.png';
import less from './less.png';
import wait from './wait.png';
import empty from './empty.png';
import join from './join.png';




import en from './en.png';
import es from './es.png';

const stats = {
  level,
  diamonds,
  money,
  people,
  private: privateIcon,
  world,
  back,
  ranking,
  logout,
  cancel,
  add,
  less,
  wait,
  empty,
  join,
  en,
  es,
};

export default ({ type, size=16, rounded=false }) => (
  <Image size={size} alt={type} src={stats[type]} rounded={rounded} />
);
