/**
 * Express to create the router
 */
const express = require('express');
const router = express.Router();

/**
 * Including the controllers
 */
const VinylController = require('../Controllers/vinylController');

/**
 * All the routes
 */
router.get('/', VinylController.getVinyl);

/**
 * Exporting the router
 */
module.exports = router;