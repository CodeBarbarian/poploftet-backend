/**
 * Express to create the router
 */
const express = require('express');
const router = express.Router();

/**
 * Including the controller
 */
const Controller = require('../Controllers/artistController');

/**
 * Route to handle registration of new user account
 */

router.get('/artist', Controller.getArtist);

router.get('/artist/:id', Controller.getArtistByID);
router.get('/artist/:id/information', Controller.getArtistInformationByID);

/**
 * Export the router
 */
module.exports = router;