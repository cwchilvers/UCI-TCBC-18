const { User, Thought } = require('../models/models');

module.exports = {
    //* Get all thoughts
    // GET /api/thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find({});
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Get a single thought
    // GET /api/thoughts/:thoughtId
    async getThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .lean();

            if (!thought) {
                return res.status(404).json({ message: `No thought with ID ${req.params.thoughtId}`});
            }

            return res.json({thought});
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Create a new thought
    // POST /api/thoughts
    async newThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            return res.json(thought);
        } catch (err) {
            return res.status(500).json(err);
        }
    },

    //* Delete a thought
    // DELETE /api/thoughts/:thoughtId
    async deleteThought(req, res) {
        try {
            // Find the thought to be deleted and delete it
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: `No thought with ID ${req.params.thoughtId}` });
            }

            // Delete thought from creator's thoughts array
            const user = await User.findOneAndUpdate(
                { username: thought.username },
                { $pull: { thoughts: thought._id } },
                { runValidators: true, new: true }
            );

            return res.json({ message: `Thought with ID ${req.params.thoughtId} deleted` });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Update thought
    // PUT /api/thoughts/:thoughtId
    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
    
            if (!updatedThought) {
                return res.status(404).json({ message: `No thought with ID ${req.params.thoughtId}` });
            }
    
            return res.json(updatedThought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Add a reaction to a thought
    // POST /api/thoughts/:thoughtId/reactions
    async addReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $addToSet: { reactions: req.body } }, 
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: `No thought with ID ${req.params.thoughtId}`});
            }

            return res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    //* Remove a reaction from a thought
    // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: `No thought with ID ${req.params.thoughtId}`});
            }

            return res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },
};