const database = require('../Library/database');
let connection = database

/**
 * Retreive all vinyl records from the database
 * 
 * @returns results
 */
async function getAllVinylRecords() {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM vinyl_records`

        // run Query
        connection.query(stmt, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    })
}

/**
 * Retreive vinyl record by id
 * 
 * @param {integer} id 
 * @returns results
 */
async function getVinylByID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM vinyl_records WHERE id = ?`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    })
}

/**
 * Retrieve information about vinyl record based on id
 * 
 * @param {integer} id 
 * @returns results
 */
async function getVinylInformationByID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT 
        vinyl_records.ean, vinyl_records.id as recordid,
        albums.genre, albums.name as albumname, albums.released, albums.id as albumid, 
        artists.name as artistname,
        recordlabels.name as labelname
        
        FROM vinyl_records
        
        LEFT JOIN albums
        ON vinyl_records.album_id = albums.id
        
        LEFT JOIN artists
        ON albums.artist_id = artists.id
        
        LEFT JOIN recordlabels
        ON albums.recordlabel_id = recordlabels.id
        
        WHERE vinyl_records.id= ?`;

        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(console.log(results));
        })
    });
}

/**
 * Retrieve the count of the vinyl record table
 * 
 * @returns results
 */
async function getVinylStatistics() {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT COUNT(*) as count FROM vinyl_records`;

        connection.query(stmt, (error, results, fields) => {
            if (error) {
                reject(console.error(message.error));
            }

            resolve(results);
        })
    });
}

/**
 * Export the modules
 */
module.exports = {
    getAllVinylRecords,
    getVinylByID,
    getVinylInformationByID,
    getVinylStatistics
}