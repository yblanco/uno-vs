const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');

router.route('/rank')
  .post(controller.rank);




module.exports = router;
