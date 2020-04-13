import Routes from './class';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import Index from '../pages/Index';
import NewGame from '../pages/NewGame';
import Game from '../pages/Game';
import Play from '../pages/Play';
import Join from '../pages/Join';
import JoinLink from '../pages/JoinLink';
import Social from '../pages/Social';
import Friends from '../pages/Friends';





const routes = {
  notFound: {
    link: '*',
    component: NotFound,
    private: true,
  },
  home: {
    link: '/',
    component: Home,
    private: false,
  },
  index: {
    link: '/index',
    component: Index,
    private: true,
  },
  new_game: {
    link: '/new',
    component: NewGame,
    private: true,
  },
  game: {
    link: '/game',
    component: Game,
    private: true,
  },
  play: {
    link: '/play',
    component: Play,
    private: true,
  },
  join: {
    link: '/join',
    component: Join,
    private: true,
  },
  join_link: {
    link: '/join/:code',
    component: JoinLink,
    private: true,
  },
  social: {
    link: '/social',
    component: Social,
    private: true
  },
  friends: {
    link: '/friends',
    component: Friends,
    private: true,
  },
};

export default new Routes(routes);
