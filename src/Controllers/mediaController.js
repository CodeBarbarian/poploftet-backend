const mediaModel = require('../Models/mediaModel');
const helper = require('../Library/haugstad');

/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *      Vinyl Section
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

/**
 * Get All vinyl records from the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getVinylAll = async(req, res, next) => {
    var MediaData = [];

    await mediaModel.getVinylAll('media').then((result) => {
        MediaData = result;
    })

    if (helper.isEmpty(mediaModel)) {
        helper.sendResponse(res, 404);
    } else {
        helper.sendResponse(res, 200, MediaData);
    }
};

/**
 * Get vinyl record by id from database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getVinylByID = async(req, res, next) => {
    var id = req.params.id;
    var MediaData = [];

    if (helper.isEmpty(id)) {
        helper.sendResponse(res, 400);
    } else {
        await mediaModel.getVinylByID('media', id).then((result) => {
            MediaData = result;
        });
    
        if (helper.isEmpty(MediaData)) {
            helper.sendResponse(res, 404);
        } else {
            helper.sendResponse(res, 200, MediaData);
        }
    }
};

/**
 * Update vinyl record in the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateVinylByID = async(req, res, next) => {
    var id = req.params.id;
    var requestBody = req.body;
    var MediaData = [];

    if (helper.isEmpty(id) || helper.isEmpty(requestBody)) {
        helper.sendResponse(res, 400);
    } else {
        await mediaModel.updateVinylByID('media', id, requestBody).then((result) => {
            MediaData = result;
        });

        if (helper.isEmpty(MediaData)) {
            helper.sendResponse(res, 400);
        } else {
            helper.sendResponse(res, 200, MediaData);
        }
    }
};

/**
 * delete vinyl record from the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteVinylByID = async(req, res, next) => {
    var id = req.params.id;
    var MediaData = [];

    if (helper.isEmpty(id)) {
        helper.sendResponse(res, 400)
    } else {
        await mediaModel.deleteVinylByID('media', id).then((result) => {
            MediaData = result;
        });

        if (helper.isEmpty(MediaData)) {
            helper.sendResponse(res, 404);
        } else {
            helper.sendResponse(res, 200, MediaData);
        }
    }
};

/**
 * Insert new Vinyl into the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const newVinylEntry = async(req, res, next) => {
    var MediaData = [];
    var RequestBody = req.body;

    await mediaModel.newVinylEntry('media', RequestBody).then((result) => {
        MediaData = result;
    });

    if (helper.isEmpty(MediaData)) {
        helper.sendResponse(res, 400);
    } else {
        helper.sendResponse(res, 201);
    }
};

const getLabelAll = async(req, res, next) => {

};

module.exports = {
    /**
     * Vinyl
     */
    getVinylAll,
    getVinylByID,
    updateVinylByID,
    deleteVinylByID,
    newVinylEntry,

    /**
     * Label
     */
    getLabelAll
}