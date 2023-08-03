const { ObjectId } = require('mongodb');
const { User, Thought } = require('../models');

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
                return res.status(404).json({ message: 'No user with that ID' });
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
                return res.status(404).json({ message: 'No such user exists' })
            }

            // Delete all thoughts associated with user
            const thought = await Thought.deleteMany({ username: user.username });

            if (!thought) {
                return res.status(404).json({
                    message: 'User deleted, but no thoughts found'
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

    }
};