const database = require('../Library/database');
let connection = database;

async function getAllSongs() {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM songs`

        // run Query
        connection.query(stmt, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    })
}

async function getSongFromAlbum(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM songs WHERE album_id = ? ORDER BY songorder ASC`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function getAllSongsByAlbumID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM songs WHERE album_id = ?`;
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
    getAllSongs,
    getSongFromAlbum,
    getAllSongsByAlbumID
}