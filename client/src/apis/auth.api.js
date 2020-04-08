import Rest from './index';

class AuthRest extends Rest {
  getAppId() {
    return this.responseAuth(`app_id?date=${new Date().getTime()}`);
  }

  auth(user, id) {
    return this.requestAuth(`sign/${id}`, 'post', user)
  }

  checkUser(logged, id) {
    return this.responseAuth(`check/${id}`, 'post', logged)
  }

  logout(id) {
    return this.responseAuth(`logout/${id}`);
  }
}

export default new AuthRest(`auth`);
