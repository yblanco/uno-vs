import Rest from './index';

class AuthRest extends Rest {
  getAppId() {
    return this.responseAuth(`app_id?date=${new Date().getTime()}`);
  }

  auth(user) {
    return this.requestAuth('sign', 'post', user)
  }

  checkUser(logged) {
    return this.responseAuth('check', 'post', logged)
  }

  logout(logged) {
    return this.responseAuth('logout', 'post', logged);
  }
}

export default new AuthRest(`auth`);
