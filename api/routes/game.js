const express = require('express');
const router = express.Router();

const controller = require('../controllers/game.controller');

router.route('/new')
  .post(controller.new);

router.route('/get')
  .post(controller.get);

  router.route('/cancel')
    .post(controller.cancel);


module.exports = router;
