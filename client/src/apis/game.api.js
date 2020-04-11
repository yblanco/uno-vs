import Rest from './index';

class GameRest extends Rest {

  create(data) {
    return this.requestAuth(`new`, 'post', data)
  }

  get(data) {
    return this.requestAuth(`get`, 'post', data)
  }

  cancel(data) {
    return this.requestAuth(`cancel`, 'post', data)
  }

  start(data) {
    return this.requestAuth(`start`, 'post', data)
  }

}

export default new GameRest(`game`);
