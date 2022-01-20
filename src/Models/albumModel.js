/**
 * Including required modules
 */
let mysql = require('mysql');

/**
 * Let us just connect to the mysql database
 */
let connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

async function getAllAlbums() {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM albums`;
        
        connection.query(stmt, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function getAllAlbumsByArtistID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT albums.id, albums.artist_id, albums.genre, albums.name as name, albums.released, albums.created, recordlabels.name as label
        FROM albums 
        
        LEFT JOIN recordlabels
        ON albums.recordlabel_id = recordlabels.id
        
        WHERE artist_id = ? ORDER BY released ASC`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }
            resolve(results);
        });
    });
}



module.exports = {
    getAllAlbums,
    getAllAlbumsByArtistID
}