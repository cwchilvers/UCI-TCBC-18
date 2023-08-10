const router = require('express').Router();

const {
    getThoughts,
    getThought,
    newThought,
    deleteThought,
    updateThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughts_ctrl');

router.route('/').get(getThoughts).post(newThought)
router.route('/:thoughtId').get(getThought).delete(deleteThought).put(updateThought)
router.route('/:thoughtId/reactions').post(addReaction)
router.route('/:thoughtId/reactions/:reactionId').delete(removeReaction);

module.exports = router;