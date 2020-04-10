import Routes from './class';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import Index from '../pages/Index';
import NewGame from '../pages/NewGame';
import Game from '../pages/Game';


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
  }
};

export default new Routes(routes);
