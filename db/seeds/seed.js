const connection = require('../../config/connection');
const { User, Thought } = require('../../src/models/models');

const userSeeds = require('./users.json');
const thoughtSeeds = require('./thoughts.json');
const reactionSeeds = require('./reactions.json');

connection.on('error', (err) => err);

connection.once('open', async () => {
    console.log('connected');

    // Delete users collection if it exists
    let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
    if (userCheck.length) {
        await User.deleteMany(); // Clear all existing user documents
    }

    // Delete thoughts collection if it exists
    let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
    if (thoughtCheck.length) {
        await Thought.deleteMany(); // Clear all existing thought documents
    }

    // Seed users
    for (const userSeed of userSeeds.users) {
        const { username, email } = userSeed;
        await User.create({ username, email });
    }

    // Seed thoughts
    for (const thoughtText of thoughtSeeds.thoughts) {
        // Get a random user
        let randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
        const username = randomUser[0].username;

        // Create a new thought object
        const newThought = {
            thoughtText,
            username
        };

        // Add the thought to database, and use thought for next step
        const thought = await Thought.create(newThought);

        // Add the thought to the user's thoughts array
        const user = await User.findOne({ username });  // Find the user
        user.thoughts.push(thought._id);                // Push the thought's _id to user's thoughts
        await user.save(); 
    }

    // Seed reactions
    for (let i = 0; i < reactionSeeds.reactions.length; i++) {
        // Get a random thought & user
        const thoughtCount = await Thought.countDocuments(); 
        let randomThought = await Thought.findOne().skip(Math.floor(Math.random() * thoughtCount));
        let randomUser = await User.aggregate([{ $sample: { size: 1 } }]);
        
        // Create a new reaction object
        const newReaction = {
            reactionBody: reactionSeeds.reactions[i],
            username: randomUser[0].username
        };
        
        // Add the reaction to a random thought
        randomThought.reactions.push(newReaction);
        await randomThought.save();
    }

    // Close the database connection
    connection.close();
});
