/**
 * Express to create the router
 */
const express = require('express');
const router = express.Router();

/**
 * Including the controllers
 */
const MediaController = require('../Controllers/mediaController');
const ExtensionCntroller = require('../Controllers/extensionController');

/**
 * All the routes
 */

// Vinyl
router.get('/vinyl', MediaController.getVinylAll);
router.get('/vinyl/:id', MediaController.getVinylByID);
router.post('/vinyl', MediaController.newVinylEntry);
router.put('/vinyl/:id', MediaController.updateVinylByID);
router.delete('/vinyl/:id', MediaController.deleteVinylByID);

// Label
router.get('/label', MediaController.getLabelAll);

// Artists
router.get('/artist', MediaController.getArtistAll);

// Song -- Extension



/**
 * Exporting the router
 */
module.exports = router;