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

/*
if(authenticated !== false && isHome) {
  return (<Redirect to={{ pathname: redirect }} />);
}

*/

/*
export default function AuthExample() {
  return (
    <Router>
      <div>
        <AuthButton />

        <ul>
          <li>
            <Link to="/public">Public Page</Link>
          </li>
          <li>
            <Link to="/protected">Protected Page</Link>
          </li>
        </ul>

        <Switch>
          <Route path="/public">
            <PublicPage />
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <PrivateRoute path="/protected">
            <ProtectedPage />
          </PrivateRoute>
        </Switch>
      </div>
    </Router>
  );
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

function AuthButton() {
  let history = useHistory();

  return fakeAuth.isAuthenticated ? (
    <p>
      Welcome!{" "}
      <button
        onClick={() => {
          fakeAuth.signout(() => history.push("/"));
        }}
      >
        Sign out
      </button>
    </p>
  ) : (
    <p>You are not logged in.</p>
  );
}

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        fakeAuth.isAuthenticated ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}




*/
