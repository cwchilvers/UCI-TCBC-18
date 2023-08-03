const { Schema } = require('mongoose');
const formatDate = require('../utils/formatDate');

// Schema for Reaction
const reactionSchema = new Schema(
    {
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        reactionBody: {
            type: String,
            required: 'Reaction is required.',
            maxlength: 280
        },
        username: {
            type: String,
            required: 'Username is required.'
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => formatDate(createdAtVal)
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

module.exports = reactionSchema;