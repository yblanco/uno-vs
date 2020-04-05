const express = require('express');

const controller = require('../controllers/socket.controller');

const router = express.Router();

router.route('/').post(controller.event);

module.exports = router;
