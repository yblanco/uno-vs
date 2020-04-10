import React from 'react';
import { Route, Switch, Redirect } from 'react-router';

import routes from './routes';

const Routes = ({ auth, redirect }) => {
  const notFound = routes.getNotFound();
  const { link:home } = routes.getRoute();
  const isAuth = auth !== false;
  return (
    <Switch>
      {
        routes.getKeys().map((i) => {
          const { isPrivate, id, link, component:Component } = routes.getRoute(i);
          const params = { key: id, exact: true, path: link };
          if(isPrivate) {
            return (
              <Route
                { ...params }
                render={({ location:from }) => (
                  isAuth
                  ? (<Component />)
                  : (<Redirect to={{ pathname: home, state: { from } }} />)
                )}
              />
            );
          }
          return (
            <Route { ...params } component={Component} />
          );
        }).concat(<Route key={notFound.id} component={notFound.component} />)
      }
    </Switch>
  );
};

export { Routes }
export default routes;
