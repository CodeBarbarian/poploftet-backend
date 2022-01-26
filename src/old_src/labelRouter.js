/**
 * Express to create the router
 */
const express = require('express');
const router = express.Router();

/**
 * Including the controller
 */
const Controller = require('../Controllers/labelController');

/**
 * Route to handle registration of new user account
 */

// Get Label
router.get('/label', Controller.getLabel);
// Get label by ID
router.get('/label/:id', Controller.getLabelByID);
// Update specific label
router.put('/label/:id', Controller.putLabel);

// Delete Label
router.delete('/label/:id', Controller.deleteLabel);

// Create new label
router.post('/label', Controller.postLabel);

/**
 * Export the router
 */
module.exports = router;