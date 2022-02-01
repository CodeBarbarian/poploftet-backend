/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *  @name:      Poploftet-Backend
 *  @version:   1.0
 *  @author:    Morten Haugstad
 *  @description: Backend for Poploftet
 * 
 *  @file: app.js
 * 
 * 
 *  @changelog
 *      01/02/2022:
 *          - Added some documentation to the different requires
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
const cors = require("cors");
const tokenValidator = require('./Library/token');
const Router = require('./Routers/Router')
const swaggerUI = require("swagger-ui-express");
const helmet = require('helmet');
const morgan = require('morgan')

/**
 * Set app = express
 */
const app = express();

/**
 * Requiring log-timestamp to get timestamps on all console logs
 */
require('log-timestamp');

/**
 * Preflight check before actually doing anything
 */
require('./Library/preflight');

/**
 * Use Morgan for logging
 */
app.use(morgan('combined'))

/**
 * Security Middleware
 */
app.use(helmet());

/**
 * Middleware allows us to access the request.body.<params>
 */
app.use(express.json());

/**
 * Middleware use CORS
 */
app.use(cors());

/**
 * Middleware to use urlencode
 */
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

/**
 * Sett which router to use
 */
app.use('/api/v1', Router);

/**
 * Default route to display swagger
 */
app.use('/api/v1', swaggerUI.serve,swaggerUI.setup(require('./swagger-docs/basic.json')));


/**
 * Get the port from the environment
 */
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