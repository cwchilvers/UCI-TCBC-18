const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT;
const app = express();

app
    .use(express.urlencoded({ extended: true }))
    .use(express.json())
    .use(routes);

db.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});