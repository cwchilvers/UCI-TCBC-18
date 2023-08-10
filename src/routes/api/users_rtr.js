const router = require('express').Router();

const {
    getUsers,
    getUser,
    newUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/users_ctrl');

router.route('/').get(getUsers).post(newUser);
router.route('/:userId').get(getUser).put(updateUser).delete(deleteUser);
router.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = router;