const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router.route('/app_id')
  .get(controller.app_id);

router.route('/sign')
  .post(controller.sign);

  router.route('/check')
    .post(controller.check);


module.exports = router;
