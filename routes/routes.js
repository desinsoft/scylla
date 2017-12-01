var express = require('express'),
actions = require('../actions/methods');

var router = express.Router();

router.post('/authenticate', actions.authenticate);

module.exports=router;