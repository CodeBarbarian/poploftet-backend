/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *  @name:      Poploftet-Backend
 *  @version:   1.0
 *  @author:    Morten Haugstad
 *  @description: Backend for Poploftet
 * 
 *  @file: app.js
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

/**
 * The ability to pull params from .env file
 */
 require('dotenv').config();


/**
 * Include required modules
 */
const express = require('express');
const app = express();
const cors = require("cors");
const tokenValidator = require('./Library/token');
const Router = require('./Routers/Router')
const swaggerUI = require("swagger-ui-express");
const helmet = require('helmet');

/**
 * Other Require
 */
require('log-timestamp');
// Running Preflight
require('./Library/preflight');

// Midleware for 
app.use(helmet());

// Middleware allows us to access the request.body.<params>
app.use(express.json());

// Cross Origin
app.use(cors());

// URL Encode
app.use(express.urlencoded({extended:false}));

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

// Allows the API to use them
app.use('/api/v1', Router);

/**
 * Default route to display swagger
 */
app.use('/api/v1', swaggerUI.serve,swaggerUI.setup(require('./swagger-docs/basic.json')));


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