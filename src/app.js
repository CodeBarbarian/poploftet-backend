// The ability to pull params from .env file
require('dotenv').config();

// Declare and initialize the ExpressJS framework
const express = require('express');
const app = express();
require('log-timestamp');

// Middleware allows us to access the request.body.<params>
app.use(express.json());

const tokenValidator = require('./Library/token');

/*
app.use(tokenValidator.validateToken);

https://expressjs.com/en/advanced/best-practice-security.html
Implement helmet

Securing Nodejs applications
https://dev.to/shaikhshahid/a-guide-to-securing-node-js-applications-4bcc
*/
// Including the router
const Router = require('./Routers/Router');

// Allows the API to use them
app.use('/api/v1', Router);

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