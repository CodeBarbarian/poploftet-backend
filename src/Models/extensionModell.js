/**
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 *  @name:      Poploftet-Backend
 *  @version:   1.0
 *  @author:    Morten Haugstad
 *  @description: Backend for Poploftet
 * 
 *  @file: extensionModel.js
 *  @description: Model for the Extension Controller. Takes care of all data to controller operations.
 * 
 * @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 */

const database = require('../Library/database');
const helper = require('../Library/haugstad');

const getSongAll = async(table) => {
    var SongData = [];
    
    await database.getAll(table).then((result) => {
        SongData = result;
    });

    if (helper.isEmpty(SongData)) {
        return false;
    } else {
        return SongData;
    }
};

const getSongByID = async(table, id) => {
    var SongData = [];

    await database.getEntryByID(table, id).then((result) => {
        SongData = result;
    });

    if (helper.isEmpty(SongData)) {
        return false;
    } else {
        return SongData;
    }
};

const updateSongByID = async(table, id, request) => {
    var SongData = [];
    var CheckData = [];
   
    await database.getEntryByID(table, id).then((result) => {
        CheckData = result;
    });

    if (helper.isEmpty(CheckData)) {
        return false;
    } else {
        await database.updateEntryByID(table, id, request).then((result) => {
            SongData = result;
        });

        if (helper.isEmpty(SongData)) {
            return false;
        } else {
            return SongData
        }
    }
};

const deleteSongByID = async(table, id) => {
    var SongData = [];
    var CheckData = [];

    await database.getEntryByID(table, id).then((result) => {
        CheckData = result;
    });

    if (helper.isEmpty(CheckData)) {
        return false;
    } else {
        await database.deleteEntryByID(table, id).then((result) => {
            SongData = result;
        });

        if (helper.isEmpty(SongData)) {
            return false;
        } else {
            return SongData;
        }
    }
};

const newSongEntry = async(table, data) => {
    var SongData = [];

    await database.newEntry(table, data).then((result) => {
        SongData = result;
    });

    return SongData;
};

module.exports = {
    getSongAll,
    getSongByID,
    updateSongByID,
    deleteSongByID,
    newSongEntry
}