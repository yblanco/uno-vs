class Routes {
  constructor(routesBase) {
    this.routes = {};
    Object.keys(routesBase).forEach((item, key) => {
      const { link, component, private:isPrivate } = routesBase[item];
      this.routes[item] = { link, component, id: key, isPrivate };
    });
  }

  getLink(name = 'home', params = {}) {
    let { link } = this.getRoute(name);
    Object.keys(params).forEach((i) => {
      link = link.replace(`:${i}`, params[i]);
    });
    return link;
  }

  getRoutes() {
    return this.getKeys().map((i) => this.getRoute(i));
  }

  getRoute(name = 'home') {
    let route = this.routes[name];
    if (route === undefined) {
      route = this.routes['index']
    }
    return route;
  }

  getNotFoundKey() {
    return Object.keys(this.routes).find((i) => {
      const route = this.getRoute(i);
      if (route.link === '*') return true;
      return false;
    });
  }

  getNotFound() {
    return this.getRoute(this.getNotFoundKey());
  }

  getKeys(notFound = false) {
    return Object.keys(this.routes).filter((i) => (notFound || i !== this.getNotFoundKey()));
  }
}

export default Routes;
