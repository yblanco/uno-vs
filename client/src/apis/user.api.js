import Rest from './index';

class UserRest extends Rest {
  rank(user) {
    return this.responseAuth('rank', 'post', user)
  }
}

export default new UserRest(`user`);
