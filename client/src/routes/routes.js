import Routes from './class';

import Home from '../pages/Home';
import NotFound from '../pages/NotFound';

import Index from '../pages/Index';


const routes = {
  notFound: {
    link: '*',
    component: NotFound,
  },
  home: {
    link: '/',
    component: Home,
  },
  index: {
    link: '/index',
    component: Index,
  },
};

export default new Routes(routes);
