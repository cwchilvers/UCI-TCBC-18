const router = require('express').Router();
const apiRouter = require('./api/api_rtr');

router
    .use('/api', apiRouter)
    .use((req, res) => res.send('404: Not Found'));

module.exports = router;