/**
 * Including required modules
 */
const Helper = require('./haugstad');
let mysql = require('mysql');
const Validator = require('validator');
let sqlstring = require('sqlstring');

/**
 * Let us just connect to the mysql database
 */
let connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

/**
 * Retrieves all rows in a given table in the database
 * 
 * 
 * @param {string} table 
 * @returns Promise
 */
async function getAll(table) {
    return new Promise((resolve, reject) => {
        if (Helper.isEmpty(table)) {
            reject(false)
        }
        
        let stmt = `SELECT * FROM ${table}`;

        connection.query(stmt, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

/**
 * Retrieves a given entry by id in the database
 * 
 * @param {string} table 
 * @param {integer} id 
 * @returns Promise()
 */
async function getEntryByID(table, id) {
    return new Promise((resolve, reject) => {
        if (Helper.isEmpty(table) || Helper.isEmpty(id)) {
            reject(false);
        }

        let stmt = `SELECT * FROM ${table} WHERE id = ?`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function updateEntryByID(table, id, data) {
    var LabelData = [];
    var FieldName = data[0].field;
    var FieldValue = data[0].value;

    // Check if all the fields are present and accounted for
    if (Helper.isEmpty(table) || Helper.isEmpty(id) || Helper.isEmpty(data)) {
         return false;
    } 
    
    // Check if data contains the correct fields
    if (Helper.isEmpty(FieldName) || Helper.isEmpty(FieldValue)) {
        return false;
    }

    // Check if id exists in the database
    await getEntryByID(table, id).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        return false;
    }

    // Validate check if the Fieldname and the fieldname value is accepted
    if (!Validator.matches(FieldName, "^[a-zA-Z0-9_\.\-\\s]*$")) {
        return false;
    } 

    if (!Validator.matches(FieldValue, "^[a-zA-Z0-9_\.\-\\s]*$")) {
        return false;
    }

    return new Promise((resolve, reject) => {
        let stmt = `UPDATE ${table} SET ${FieldName} = ? WHERE id = ?`;
        let stmtvalue = [FieldValue, id];

        console.log(`Statement: ${stmt} - Values: ${stmtvalue}`);
        console.log(`UPDATE ${table} SET ${FieldName} = ${FieldValue} WHERE id = ${id}`)

        connection.query(stmt, stmtvalue, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function deleteEntryByID(table, id) {
    var LabelData = [];

    if (Helper.isEmpty(table) || Helper.isEmpty(id)) {
        return false;
    }

    await getEntryByID(table, id).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        return false;
    }

    return new Promise((resolve, reject) => {
        let stmt = `DELETE FROM ${table} WHERE id = ?`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function newEntry(table, data) {
    var RequestBody = data;
    var fieldnames = RequestBody[0].fieldnames;
    var fieldvalues = RequestBody[0].fieldvalues;
    
    if (Helper.isEmpty(table) || Helper.isEmpty(RequestBody)) {
        return false;
    }

    // Check if fieldnames and fieldvalues have the same number of items in thme
    if (fieldnames.length !== fieldvalues.length) {
        return false;
    }


    // Check if all the fieldnames pass validation
    for(let i=0; i < fieldnames.length; i++) {
        if (!Validator.matches(fieldnames[i], "^[a-zA-Z0-9_\.\-\\s]*$")) {
            return false;
        }

        if (!Validator.matches(fieldvalues[i], "^[a-zA-Z0-9_\.\-\\s]*$")) {
            return false;
        }
    }
    
    return new Promise((resolve, reject) => {
        let stmt = `INSERT INTO ${table} (${fieldnames}) VALUES (?)`;
        let stmtvalues = [fieldvalues.toString()]

        connection.query(stmt, stmtvalues, (error, results, fields) => {

            if (error) {
                console.log(sqlstring.format(stmt, stmtvalues));
                reject(console.error(error.message));
            }
            console.log(sqlstring.format(stmt, stmtvalues));
            resolve(results);
        });
    });
}

module.exports = {
    connection,

    getAll,
    getEntryByID,
    updateEntryByID,
    deleteEntryByID,
    newEntry
}