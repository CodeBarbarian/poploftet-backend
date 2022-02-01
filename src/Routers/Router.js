/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *  @name:      Poploftet-Backend
 *  @version:   1.0
 *  @author:    Morten Haugstad
 *  @description: Backend for Poploftet
 * 
 *  @file: Router.js
 *  @description: Responsible for all the routing
 * 
 * 
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */


/**
 * Express to create the router
 */
const express = require('express');
const router = express.Router();

/**
 * Including the controllers
 */
const MediaController = require('../Controllers/mediaController');
const ExtensionCntroller = require('../Controllers/extensionController'); // Used for songs

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
router.get('/song', ExtensionCntroller.getSongAll);
router.get('/song/:id', ExtensionCntroller.getSongByID);
router.post('/song/', ExtensionCntroller.newSongEntry);
router.put('/song/:id', ExtensionCntroller.updateSongByID);
router.delete('/song/:id', ExtensionCntroller.deleteSongByID);


/**
 * Exporting the router
 */
module.exports = router;