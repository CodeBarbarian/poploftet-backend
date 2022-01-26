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
            helper.sendResponse(res, 202, MediaData);
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

/**
 * Get all labels from database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getLabelAll = async(req, res, next) => {
    var LabelData = [];

    await mediaModel.getLabelAll('media', 'distinct label').then((result) => {
        LabelData = result;
    });

    if (helper.isEmpty(LabelData)) {
        helper.sendResponse(res, 404);
    } else {
        helper.sendResponse(res, 200, LabelData);
    }
};

const getArtistAll = async(req, res, next) => {
    var ArtistData = [];

    await mediaModel.getArtistAll('media', 'distinct artist').then((result) => {
        ArtistData = result;
    });

    if (helper.isEmpty(ArtistData)) {
        helper.sendResponse(res, 404);
    } else {
        helper.sendResponse(res, 200, ArtistData);
    }
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
    getLabelAll,
    
    /**
     * Artist
     */
     getArtistAll
}