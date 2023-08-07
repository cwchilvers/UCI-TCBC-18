const router = require('express').Router();

const {
    getThoughts,
} = require('../../controllers/thoughts_ctrl');

router
    .route('/').get(getThoughts)

module.exports = router;
