import Routes from './class';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import Index from '../pages/Index';
import NewGame from '../pages/NewGame';
import Game from '../pages/Game';
import Play from '../pages/Play';
import Join from '../pages/Join';


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
  }
};

export default new Routes(routes);
