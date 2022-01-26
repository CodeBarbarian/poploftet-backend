/**
 * Express to create the router
 */
const express = require('express');
const router = express.Router();

/**
 * Including the controller
 */
const Controller = require('../Controllers/songController');

/**
 * Route to handle registration of new user account
 */

router.get('/song', Controller.getSong)

/**
 * Export the router
 */
module.exports = router;