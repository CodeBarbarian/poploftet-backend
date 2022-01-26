// Access to environment
require('dotenv').config();

/**
 * Include required modules
 */
const express = require('express');
const app = express();
const tokenValidator = require('./Library/token');
const Router = require('./Routers/Router')

/**
 * Other Require
 */
require('log-timestamp');
// Running Preflight
require('./Library/preflight');

// Middleware allows us to access the request.body.<params>
app.use(express.json());

/**
 * Environemnt switch for production
 * Probably more secure to just anything else than development do the auth stuff
 * This uses the authentication server at: https://github.com/CodeBarbarian/authentication-server
 */
if (process.env.APPLICATION_STATE === 'production') {
    console.log("Poploftet-Backend is starting in production mode with Authentication");
    app.use(tokenValidator.validateToken);
} else {
    console.log("Poploftet-Backend is starting in development mode without Authentication");
}

/*
https://expressjs.com/en/advanced/best-practice-security.html
Implement helmet

Securing Nodejs applications
https://dev.to/shaikhshahid/a-guide-to-securing-node-js-applications-4bcc
*/
// Including the router


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