const express = require('express');
const router = express.Router();

router.route('/')
  .get((req, res) => res.response(true, { status: 'Running', env: req.app.get('env'), services: [] }));


module.exports = router;
