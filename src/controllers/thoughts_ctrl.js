const { Thoughts } = require('../models/models');

module.exports = {
    // Get all thoughts
    async getThoughts(req, res) {
        try {
            const thoughts = await Thoughts.find({});
            return res.json(thoughts);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Get a single thought
    async getThought(req, res) {
        try {
            const thought = await Thoughts.findOne({ _id: req.params.thoughtId })
                .select('-__v')
                .lean();

            if (!thought) {
                return res.status(404).json({ message: `No thought with ID ${req.params.thoughtId}`});
            }

            res.json({
                thought,
                grade: await grade(req.params.thoughtId),
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Create a new thought
    async newThought(req, res) {
        try {
            const thought = await Thoughts.create(req.body);
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    // Delete a thought
    async deleteThought(req, res) {
        try {
            const thought = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId });

            if (!thought) {
                return res.status(404).json({ message: `No such thought with ID ${req.params.thoughtId}`})
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Add a reaction to a thought
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

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Delete a reaction from a thought
    async deleteReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: `No thought with ID ${req.params.thoughtId}`});
            }

            res.json(thought);
        } catch (err) {
            console.log(err);
            return res.status(500).json(err);
        }
    },

    // Update thought
    async updateThought(req, res) {

    }
};