/**
 * Express to create the router
 */
const express = require('express');
const router = express.Router();

/**
 * Including the controller
 */
const Controller = require('../Controllers/vinylController');

/**
 * Route to handle registration of new user account
 */

router.get('/vinyl', Controller.getVinyl);
router.get('/vinyl/stats', Controller.getVinylStatistics);
router.get('/vinyl/:id', Controller.getVinylByID);
router.get('/vinyl/information/:id', Controller.getVinylInformationByID);

router.patch('/vinyl', Controller.patchVinyl);
router.post('/vinyl', Controller.postVinyl);
/**
 * Export the router
 */
module.exports = router;