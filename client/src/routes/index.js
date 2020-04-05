import React from 'react';
import { Route, Switch } from 'react-router';

import routes from './routes';

const Routes = () => {
  const notFound = routes.getNotFound();
  const routesList = routes.getKeys().map((i) => {
    const route = routes.getRoute(i);
    return (
      <Route key={route.id} exact path={route.link} component={route.component} />
    );
  });
  routesList.push(<Route key={notFound.id} component={notFound.component} />);
  return (
    <Switch>
      {routesList}
    </Switch>
  );
};

export { Routes }
export default routes;
