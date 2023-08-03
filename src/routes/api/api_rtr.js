const router = require('express').Router();
const { users_rtr, thoughts_rtr, reactions_rtr } = require('./');

router
    .use('/users', users_rtr)
    .use('/thoughts', thoughts_rtr)
    .use('/reactions', reactions_rtr);

module.exports = router;