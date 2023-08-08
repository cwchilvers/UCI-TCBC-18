const { Schema, model } = require('mongoose');

// Schema to create User model
const userSchema = new Schema(
    {
        username: {
            type: String,
            required: 'Username is required.',
            trim: true,
            unique: true
        },
        email: {
            type: String,
            required: 'Email address is required.',
            unique: true,
            match: [/.+@.+\..+/, 'A valid e-mail address is required.']
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
    }
);

// Virtual for friend count
userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
});

// Create User model using userSchema
module.exports = model('User', userSchema);