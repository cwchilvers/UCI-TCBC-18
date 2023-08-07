const { User, Thought } = require('../models/models');

module.exports = {
    // Get all users
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            const usersObj = {
                users,
                headCount: await headCount(),
            };
            return res.json(usersObj);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single user
    async getUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId })
                .select('-__v')
                .lean();

            if (!user) {
                return res.status(404).json({ message: `No user with ID ${req.params.userId}` });
            }

            res.json({
                user,
                grade: await grade(req.params.userId),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new user
    async newUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a user
    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndRemove({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: `No such user with ID ${req.params.userId}`})
            }

            // Delete all thoughts associated with user
            const thought = await Thought.deleteMany({ username: user.username });

            if (!thought) {
                return res.status(404).json({
                    message: `User ${user.username} deleted, but no thoughts found`
                })
            }

            res.json({ message: `User ${user.username} deleted successfully`});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update a user
    async updateUser(req, res) {

    },

    // Add a user to a user's friend list
    async addFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            const friend = await User.findOne({ _id: req.params.friendId });

            if (!user) {
                return res.status(404).json({ message: `No user with ID ${req.params.userId}` });
            }

            if (!friend) {
                return res.status(404).json({ message: `No user with ID ${req.params.friendId}` });
            }

            // Add friend to user's friend list
            user.friends.push(friend);

            // Save user
            await user.save();

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Remove a user from a user's friend list
    async removeFriend(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.userId });
            const friend = await User.findOne({ _id: req.params.friendId });

            if (!user) {
                return res.status(404).json({ message: `No user with ID ${req.params.userId}` });
            }

            if (!friend) {
                return res.status(404).json({ message: `No user with ID ${req.params.friendId}` });
            }

            // Remove friend from user's friend list
            user.friends.pull(friend);

            // Save user
            await user.save();

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};
