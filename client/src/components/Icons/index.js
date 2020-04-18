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
import error from './error.png';
import add from './add.png';
import less from './less.png';
import wait from './wait.png';
import empty from './empty.png';
import join from './join.png';
import loading from './loading.gif';
import setting from './setting.png';
import friends from './friends.png';
import cup from './cup.png';
import search from './search.png';
import blockfriend from './blockfriend.png';
import unblockfriend from './unblockfriend.png';
import addfriend from './addfriend.png';
import acceptfriend from './acceptfriend.png';
import cancelfriend from './cancelfriend.png';
import message from './message.png';
import bell from './bell.png';
import info from './info.png';
import chat from './chat.png';
import favchat from './favchat.png';
import stop from './stop.png';
import card from './card.png';
import uno from './uno.png';
import beta from './beta.png';






import en from './en.png';
import es from './es.png';

const stats = {
  level,
  diamonds,
  money,
  reward: money,
  people,
  private: privateIcon,
  world,
  back,
  ranking,
  logout,
  error,
  add,
  less,
  wait,
  empty,
  join,
  loading,
  setting,
  friends,
  blockfriend,
  unblockfriend,
  addfriend,
  acceptfriend,
  cancelfriend,
  cup,
  bell,
  search,
  message,
  info,
  chat,
  card,
  favchat,
  stop,
  en,
  es,
  uno,
  beta,
};

export default ({ type, size=16, ...others }) => (
  <Image size={size} alt={type} src={stats[type]} {...others} />
);
