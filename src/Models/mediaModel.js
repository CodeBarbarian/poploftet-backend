const database = require('../Library/database');
const helper = require('../Library/haugstad');

/**
 * Get All Vinyl from database
 * 
 * @param {*} table 
 * @returns 
 */
const getVinylAll = async (table) => {
    var MediaData = [];

    await database.getAll(table).then((result) => { 
        MediaData = result;
    });

    return MediaData;
};

/**
 * Get Vinyl By ID
 * 
 * @param {*} table 
 * @param {*} id 
 * @returns 
 */
const getVinylByID = async(table, id) => {
    var MediaData = [];

    await database.getEntryByID(table, id).then((result) => {
        MediaData = result;
    });

    return MediaData;
};

/**
 * Update vinyl by id
 * 
 * @param {*} table 
 * @param {*} id 
 * @param {*} request 
 * @returns 
 */
const updateVinylByID = async(table, id, request) => {
    var MediaData = [];
    var CheckData = [];
    
    await database.getEntryByID(table, id, request).then((result) => {
        CheckData = result;
    });

    if (helper.isEmpty(CheckData)) {
        return false;
    } else {
        await database.updateEntryByID(table, id, request).then((result) => {
            MediaData = result;
        });
    
        return MediaData;
    }
};


/**
 * Delete Vinyl By id
 * 
 * @param {*} table 
 * @param {*} id 
 * @returns 
 */
const deleteVinylByID = async(table, id) => {
    var MediaData = [];
    var CheckData = [];

    await database.getEntryByID(table, id).then((result) => {
        CheckData = result;
    });

    if (helper.isEmpty(CheckData)) {
        return false;
    } else {
        await database.deleteEntryByID(table, id).then((result) => {
            MediaData = result;
        });

        if (helper.isEmpty(MediaData)) {
            return false;
        } else {
            return MediaData;
        }
    }
};

/**
 * New Vinyl Entry
 * 
 * @param {*} table 
 * @param {*} data 
 * @returns 
 */
const newVinylEntry = async(table, data) => {
    var MediaData = [];
    var EanData = [];

    var FieldEan = data[0].fieldnames.indexOf('ean');
    var FieldEanValue = data[0].fieldvalues[FieldEan];

    // Check if the ean is the same
    await database.getEntryByField(table, FieldEanValue, 'ean').then((result) => {
        EanData = result;
    });

    if (!helper.isEmpty(EanData)) {
        return false;
    }

    await database.newEntry(table, data).then((result) => {
        MediaData = result;
    });

    return MediaData;
};

/**
 * Get all the labels
 * 
 * @param {*} table 
 * @param {*} field 
 * @returns 
 */
const getLabelAll = async(table, field) => {
    var LabelData = [];

    await database.getAllByField(table, field).then((result) => {
        LabelData = result;
    });

    if (helper.isEmpty(LabelData)) {
        return false;
    } else {
        return LabelData;
    }
};

const getArtistAll = async(table, field) => {
    var ArtistData = [];

    await database.getAllByField(table, field).then((result) => {
        ArtistData = result;
    });

    if (helper.isEmpty(ArtistData)) {
        return false;
    } else {
        return ArtistData;
    }
}

module.exports = {
    /**
     * All vinyl functions
     */
    getVinylAll,
    getVinylByID,
    updateVinylByID,
    deleteVinylByID,
    newVinylEntry,

    /**
     * All Label Functions
     */
     getLabelAll,

     /**
      * All Artist functions
      */
      getArtistAll


}