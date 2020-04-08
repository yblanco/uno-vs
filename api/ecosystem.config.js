const APP_NAME = require('./package.json').name;
// Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
module.exports = {
  apps: [{
    name: APP_NAME,
    script: 'bin/www',
    instances: 1,
    autorestart: true,
    watch: true,
  }],
};
