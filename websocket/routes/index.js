/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
const fs = require('fs');
const path = require('path');
const express = require('express');

const router = express.Router();

const loadDir = (dirname = __dirname, prefix = '') => {
  fs
    .readdirSync(dirname)
    .filter(file => ['.', 'index.js'].indexOf(file) < 0)
    .forEach(file => {
      const pathFile = path.join(dirname, file);
      const prefixName = file.split('.').shift();
      const prefixRoute = [prefix, prefixName].filter(item => item !== '').join('/');
      if(fs.statSync(pathFile).isDirectory()) {
        loadDir(pathFile, file)
      } else {
        router.use(`/${prefixRoute}`, require(pathFile));
      }
    })
}

loadDir();

router.route('/')
  .get((req, res) => res.response(true, req.app.get('env')));


module.exports = router;
