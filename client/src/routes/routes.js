import Routes from './class';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import Index from '../pages/Index';


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
    home: true,
  },
  index: {
    link: '/index',
    component: Index,
    private: true,
  },
};

export default new Routes(routes);
