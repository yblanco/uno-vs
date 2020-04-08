const express = require('express');
const router = express.Router();

const controller = require('../controllers/auth.controller');

router.route('/app_id')
  .get(controller.app_id);

router.route('/sign/:socketId')
  .post(controller.sign);

router.route('/check/:socketId')
  .post(controller.check);

router.route('/logout/:socketId')
  .get(controller.off);


module.exports = router;
