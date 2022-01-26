const extensionModel = require('../Models/extensionModell');
const helper = require('../Library/haugstad');

/**
 * get all songs from database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getSongAll = async(req, res, next) => {
    var SongData = [];

    await extensionModel.getSongAll('media_ext').then((result) => {
        SongData = result;
    });

    if (helper.isEmpty(SongData)) {
        helper.sendResponse(res, 400);
    } else {
        helper.sendResponse(res, 200, SongData);
    }
};

/**
 * get songs by id from database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getSongByID = async(req, res, next) => {
    var id = req.params.id;
    var SongData = [];

    if (helper.isEmpty(id)) {
        helper.sendResponse(res, 400);
    } else {
        await extensionModel.getSongByID('media_ext', id).then((result) => {
            SongData = result;
        });

        if (helper.isEmpty(SongData)) {
            helper.sendResponse(res, 404);
        } else {
            helper.sendResponse(res, 200, SongData);
        }
    }
};

/**
 * update songs by id
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const updateSongByID = async(req, res, next) => {
    var id = req.params.id;
    var requestBody = req.body;
    var SongData = [];

    if (helper.isEmpty(id) || helper.isEmpty(requestBody)) {
        helper.sendResponse(res, 400);
    } else {
        await extensionModel.updateSongByID('media_ext', id, requestBody).then((result) => {
            SongData = result;
        });

        if (helper.isEmpty(SongData)) {
            helper.sendResponse(res, 400);
        } else {
            helper.sendResponse(res, 202, SongData);
        }
    }
};

/**
 * delete songs by id from database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteSongByID = async(req, res, next) => {
    var id = req.params.id;
    var SongData = [];

    if (helper.isEmpty(id)) {
        helper.sendResponse(res, 400);
    } else {
        await extensionModel.deleteSongByID('media_ext', id).then((result) => {
            SongData = result;
        });

        if (helper.isEmpty(SongData)) {
            helper.sendResponse(res, 400);
        } else {
            helper.sendResponse(res, 200, SongData);
        }
    }
};

/**
 * add new song to database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const newSongEntry = async(req, res, next) => {
    var SongData = [];
    var requestBody = req.body;

    await extensionModel.newSongEntry('media_ext', requestBody).then((result) => {
        SongData = result;
    });

    if (helper.isEmpty(SongData)) {
        helper.sendResponse(res, 400);
    } else {
        helper.sendResponse(res, 201, SongData);
    }
};

module.exports = {
    getSongAll,
    getSongByID,
    updateSongByID,
    deleteSongByID,
    newSongEntry
};