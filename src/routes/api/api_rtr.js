const router = require('express').Router();
const users_rtr = require('./users_rtr');
const thoughts_rtr = require('./thoughts_rtr');

router
    .use('/users', users_rtr)
    .use('/thoughts', thoughts_rtr)

module.exports = router;