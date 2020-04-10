export const snackbar = {
  show: false,
  text: '',
  type: '',
};

export const app = {
  ready: false,
  lang: 'en',
};

export const auth = {
  facebook_id: false,
  google_id: false,
  login: false,
  authenticated: false,
  check: false,
};

export const user = {
  friends: [],
  rank: {
    global: [],
    friends: [],
  }
};

export const game = {
  current: false,
  info: {},
};

export default {
  snackbar,
  app,
  auth,
  user,
  game,
};
