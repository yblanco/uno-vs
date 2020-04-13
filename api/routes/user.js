const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.route('/rank')
  .post(controller.rank);

router.route('/search')
  .post(controller.search);

router.route('/friend/add')
  .post(controller.friend_add);

router.route('/friend/reject')
  .post(controller.friend_reject);

router.route('/friend/block')
  .post(controller.friend_block);


module.exports = router;
