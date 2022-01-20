// The ability to pull params from .env file
require('dotenv').config();

// Declare and initialize the ExpressJS framework
const express = require('express');
const app = express();
require('log-timestamp');

// Middleware allows us to access the request.body.<params>
app.use(express.json());

/*
const tokenValidator = require('./Models/tokenModel');

app.use(tokenValidator.validateToken);
*/
// Including the routerscd .
const vinylRouter = require('./Routers/vinylRouter');
const songRouter = require('./Routers/songRouter');
const artistRouter = require('./Routers/artistRouter');
const labelRouter = require('./Routers/labelRouter');

// Allows the API to use them
app.use('/api/v1', vinylRouter);
app.use('/api/v1', songRouter);
app.use('/api/v1', artistRouter);
app.use('/api/v1', labelRouter);

/**
 * Default route to display swagger
 */
app.use('/api/v1', (req, res, next) => {
    res.json(["display the swagger-ui"]);
})

// Retrieve the port number from the configuration file
const PORT = process.env.PORT;

/**
 * On start function to prettyfy the code a bit
 */
function onStart() {
    console.log(`Poploftet-Backend is running on ${PORT}`);
}

/**
 * Start the express web server
 */
app.listen(PORT, onStart);