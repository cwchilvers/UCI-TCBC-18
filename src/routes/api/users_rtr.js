const router = require('express').Router();
const {
    getUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser
} = require('../../controllers/users_ctrl');

router.route('/').get(getUsers).post(newUser);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);

module.exports = router;
