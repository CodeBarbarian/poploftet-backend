/**
 * Including required modules
 */
const database = require('../Library/database');
const Helper = require('../Library/functions');
const Validator = require('validator');

let connection = database;

async function getLabel() {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM recordlabels`;

        connection.query(stmt, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function getLabelByID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM recordlabels WHERE id = ?`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function getLabelByName(name) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM recordlabels WHERE name = ?`;
        let stmtvalues = [name];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
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
 * @returns 
 */
async function putLabel(id, data) {
    // Check if label exists
    var LabelData = []
    
    await getLabelByID(id).then((result) => {
        LabelData = result
    })

    console.log({
        "change-from":LabelData,
        "change-to":data[0]
    })
    if (Helper.isEmpty(LabelData)) {
        // Label does not exist
        console.log(`Label does not match id ${id}`);
    } else {
        if (!Validator.matches(data[0].name, "^[a-zA-Z0-9_\.\-\\s]*$")) {
            console.log(`Name ${data[0].name} is not valid`);
        } else {
            return new Promise((resolve, reject) => {
                let stmt = `UPDATE recordlabels SET name=? WHERE id=?`;
                let stmtvalues = [data[0].name, id];

                connection.query(stmt, stmtvalues, (error, results, fields) => {
                    if (error) {
                        reject(console.error(error.message));
                    }

                    resolve(results);
                });
            });
        }
    }
}

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
            
            connection.query(stmt, stmtvalues, (error, results, fields) => {
                if (error) {
                    reject(console.error(error.message));
                }

                resolve(results);
            });
        })
    }
    
}

async function postLabel(body) {
    var LabelData = []
    var RequestBody = body
    
    await getLabelByName(RequestBody.name).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        return new Promise((resolve, reject) => {
            console.log(`Trying to add ${RequestBody}`);
    
            let stmt = `INSERT INTO recordlabels (name) VALUES (?)`;
            let stmtvalues = [RequestBody.name];
            
            connection.query(stmt, stmtvalues, (error, results, fields) => {
                if (error) {
                    reject(console.error(error.message));
                }
    
                resolve(results);
            });
        })
    }
}

module.exports = {
    getLabel,
    getLabelByID,
    getLabelByName,
    putLabel,
    deleteLabel,
    postLabel
    
}