export const snackbar = {
  show: false,
  text: '',
  type: '',
};

export const app = {
  lang: 'en',
};

export const auth = {
  facebook_id: false,
  google_id: false,
  login: false,
  authenticated: false,
};

export const user = {
  friends: [],
  rank_global: [],
  rank_friends: [],
};

export const game = {
  current: false,
  info: {},
  globals: [],
};

export default {
  snackbar,
  app,
  auth,
  user,
  game,
};
