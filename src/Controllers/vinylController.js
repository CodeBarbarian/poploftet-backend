const vinylModel = require('../Models/vinylModel');
const SongModel = require('../Models/songModel');
const Helper = require('../Library/functions');

const getVinyl = async(req, res, next) => {
    var VinylData

    await vinylModel.getAllVinylRecords().then((result) => {
        VinylData = result;
    });

    Helper.sendResponse(res, 200, VinylData);
};

const getVinylByID = async(req, res, next) => {
    var VinylData
    var VinylID = req.params.id;
    
    await vinylModel.getVinylByID(VinylID).then((result) => {
        VinylData = result;
    })

    if (Helper.isEmpty(VinylData)) {
        Helper.sendResponse(res, 404);
    } else {
        Helper.sendResponse(res, 200, VinylData);
    }
};

const getVinylInformationByID = async(req, res, next) => {
    var VinylData
    var SongData
    var ReturnObject
    
    var VinylID = req.params.id;

    await vinylModel.getVinylInformationByID(VinylID).then((result) => {
        VinylData = result;
    });

    if (Helper.isEmpty(VinylData)) {
        Helper.sendResponse(res, 404);
    } else {
        await SongModel.getSongFromAlbum(VinylData[0].albumid).then((result) => {
            SongData = result;
        })

        ReturnObject = {
            "basic":VinylData,
            "songs":SongData
        }
        Helper.sendResponse(res, 200, ReturnObject);
    }
}

const postVinyl = async(req, res, next) => {
    // Use the Artist Model to create the Artist

    // Use the Record Label Model to create the record label

    // Use the Album Model to create the album

    // Use the Vinyl Model to add the Vinyl Specific
};

const getVinylStatistics = async (req, res, next) => {
    var VinylData

    await vinylModel.getVinylStatistics().then((result) => {
        VinylData = result;
    })

    if (Helper.isEmpty(VinylData)) {
        Helper.sendResponse(res, 404);
    } else {
        Helper.sendResponse(res, 200, VinylData);
    }
}

module.exports = {
    getVinyl,
    getVinylByID,
    getVinylInformationByID,
    postVinyl,
    getVinylStatistics
}