const artistModel = require('../Models/artistModel');
const albumModel = require('../Models/albumModel');
const songModel = require('../Models/songModel');


const Helper = require('../Library/functions');
/**
 * Retrieve all the artists /artist
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getArtist = async (req, res, next) => {
    /**
     * Variable to store the artistdata in when it comes from the database
     */
    var ArtistData = []

    /**
     * Await for function getAllArtists from artistModel.
     * If promise fulfilled AristData = result
     */
    await artistModel.getAllArtists().then((result) => {
        ArtistData = result;
    });

    /**
     * Use the helper function to check if the
     * artistdata object is empty or not, if so, send res.status(404)
     */
    if (Helper.isEmpty(ArtistData)) {
        Helper.sendResponse(res, 404);
    } else {
        /**
         * If object is not empty send res.status(200) send json response with artist data
         */
        Helper.sendResponse(res, 200, ArtistData);
    }
};

/**
 * Retrieve artist based on ID /artist/:id
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getArtistByID = async (req, res, next) => {
    /**
     * Get ID from request params
     */
    var id = req.params.id;
    /**
     * Variable to store the artist data in if promise is fulfilled
     */
    var ArtistData = []

    /**
     * Await for function getArtistByID from artistModel
     * If promise is fulfilled ArtistData = result
     */
    await artistModel.getArtistByID(id).then((result) => {
        ArtistData = result;
    })

    /**
     * Use the helper function to check if ArtistData Object is empty
     * If object is emtpy return http 404, if not return http 200 with object json
     */
    if (Helper.isEmpty(ArtistData)) {
        Helper.sendResponse(res, 404);
    } else {
        Helper.sendResponse(res, 200, ArtistData);
    }
};

/**
 * Retrieve artist information based on id  /artist/information/:id
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getArtistInformationByID = async (req, res, next) => {
    /**
     * Get ID from request params
     */
    var id = req.params.id;
    /**
     * Variable to store ArtistData in
     */
    var ArtistData = []

    /**
     * Variable to store AlbumData in
     */
    var AlbumData = []

    /**
     * Variable to store Songs and albums in for easier manipulation
     */
    var AlbumSongData = []
    
    /**
     * Variable to store LabelData in
     */
    var LabelData = []

    /**
     * Variable to store the returnobject in for easier manipulation
     */
    var ReturnObject

    await artistModel.getArtistByID(id).then((result) => {
        ArtistData = result;
    });

    await albumModel.getAllAlbumsByArtistID(id).then((result) => {
        AlbumData = result;
    });


    if (Helper.isEmpty(ArtistData)) {
        Helper.sendResponse(res, 404);
    } else {
        if (!Helper.isEmpty(AlbumData)) {
            /**
             * Iterate over the albums and fetch the songs for it
             */
            for (const data of AlbumData) {
                await songModel.getAllSongsByAlbumID(data.id).then((result) => {
                    AlbumSongData.push({
                        "album": data,
                        "songs":result 
                    })
                });
            }
        }

        /**
         * ReturnObject
         */
        ReturnObject = {
            "artist":ArtistData,
            "discography":AlbumSongData
        }

        /**
         * Send Response
         */
        Helper.sendResponse(res, 200, ReturnObject);
    }
};

/**
 * Create artist /artist
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const postArtist = async (req, res, next) => {

};

/**
 * Update artist /artist
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const putArtist = async (req, res, next) => {

};

/**
 * Delete artist /artist
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteArtist = async (req, res, next) => {

}

module.exports = {
    getArtist,
    getArtistByID,
    getArtistInformationByID
}