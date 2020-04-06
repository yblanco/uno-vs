export const snackbar = {
  show: false,
  text: '',
  type: '',
};

export const app = {
  ready: false,
  lang: 'en',
}

export const auth = {
  app_id: false,
  login: false,
  authenticated: false,
  check: false,
}

export const user = {
  friends: [],
  rank: {
    global: [],
    friends: [],
  }
}

export default {
  snackbar,
  app,
  auth,
  user
};
