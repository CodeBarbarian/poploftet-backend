/**
 * Including required modules
 */
const database = require('../Library/database');
const Helper = require('../Library/haugstad');
const Validator = require('validator');


/**
 * Middleware function for retrieving labels from the database
 * @returns Promise()
 */
const getLabel = async(table) => {
    var LabelData = [];

    await database.getAll(table).then((result) => {
        LabelData = result;
    });
    
    return LabelData;
}

/**
 * Retrieve record labels by id from the database
 * 
 * @param {*} id 
 * @returns Promise()
 */
const getLabelByID = async(table, id) => {
    var LabelData = [];

    await database.getEntryByID(table, id).then((result) => {
        LabelData = result;
    })

    return LabelData;
};


/**
 * Retrieve labels by name from the database
 * 
 * @param {*} name 
 * @returns Promise()
 */
async function getLabelByName(name) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM recordlabels WHERE name = ?`;
        let stmtvalues = [name];

        database.connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

/**
 * Update label
 * 
 * Only allowed to change the name of the label
 * 
 * @param {*} id 
 * @param {*} data 
 * @returns Promise()
 */
const updateLabel = async(table, id, data) => {
    var LabelData = [];

    await database.updateEntryByID(table, id, data).then((result) => {
        LabelData = result;
    });

    return LabelData;
}

/**
 * Delete label from the database
 * 
 * @param {*} id 
 * @returns Promise()
 */
/*
async function deleteLabel(id) {
    // Check if label exists
    var LabelData = []

    await getLabelByID(id).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        console.log(`No ID ${id} found`)
    } else {
        return new Promise((resolve, reject) => {
            console.log(`Trying to delete ${LabelData}`);

            let stmt = `DELETE FROM recordlabels WHERE id = ?`;
            let stmtvalues = [id];
            
            database.connection.query(stmt, stmtvalues, (error, results, fields) => {
                if (error) {
                    reject(console.error(error.message));
                }

                resolve(results);
            });
        })
    }
}
*/ 

const deleteLabel = async(table, id) => {
    var LabelData = [];

    await database.deleteEntryByID(table, id).then((result) => {
        LabelData = result;
    });

    return LabelData;
};
/**
 * Insert a new record in the label table in the database
 * 
 * @param {*} body 
 * @returns Promise()
 */
const postLabel = async(table, data) => {
    var LabelData = [];

    await database.newEntry(table, data).then((result) => {
        LabelData = result;
    });

    console.log(LabelData);
    return LabelData;
}; 

module.exports = {
    getLabel,
    getLabelByID,
    getLabelByName,
    updateLabel,
    deleteLabel,
    postLabel
}