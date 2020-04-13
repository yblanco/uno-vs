import Rest from './index';

class UserRest extends Rest {
  rank(user) {
    return this.requestAuth('rank', 'post', user)
  }

  search(data) {
    return this.requestAuth(`search`, 'post', data)
  }

  addFriend(data) {
    return this.requestAuth(`friend/add`, 'post', data)
  }

  blockFriend(data) {
    return this.requestAuth(`friend/block`, 'post', data)
  }

  rejectFriend(data) {
    return this.requestAuth(`friend/reject`, 'post', data)
  }
}

export default new UserRest(`user`);
