const { User, Thought } = require('../models/models');

module.exports = {
    //* Get all users
    // GET /api/users
    async getUsers(req, res) {
        try {
            const users = await User.find({});
            return res.json(users);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Get a single user
    // GET /api/users/:userId
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
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Create a new user
    // POST /api/users
    async newUser(req, res) {
        try {
            const user = await User.create(req.body);
            return res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Delete a user
    // DELETE /api/users/:userId
    async deleteUser(req, res) {
        try {
            // Find the user to be deleted and delete it
            const user = await User.findOneAndDelete({ _id: req.params.userId });

            if (!user) {
                return res.status(404).json({ message: `No user with ID ${req.params.userId}` });
            }

            // Delete user from friends' friend lists
            await User.updateMany(
                { _id: { $in: user.friends } },
                { $pull: { friends: req.params.userId } }
            );

            // Delete user's thoughts
            await Thought.deleteMany({ username: user.username });            
    
            res.json({ message: `User ${user.username} deleted successfully` });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Update a user
    // PUT /api/users/:userId
    async updateUser(req, res) {
        try {
            const updatedUser = await User.findOneAndUpdate(
                { _id: req.params.userId },
                { $set: req.body }, // Use $set to update the fields
                { runValidators: true, new: true }
            );

            if (!updatedUser) {
                return res.status(404).json({ message: `No user with ID ${req.params.userId}` });
            }

            res.json(updatedUser);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Add a user to a user's friend list
    // POST /api/users/:userId/friends/:friendId
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
            await user.save();

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Remove a user from a user's friend list
    // DELETE /api/users/:userId/friends/:friendId
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
            await user.save();

            res.json(user);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};
