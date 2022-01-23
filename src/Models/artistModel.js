const database = require('../Library/database');
let connection = database;

async function getAllArtists() {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM artists`;

        connection.query(stmt, (error, results, fields) => {
            if (error) {
                console.error(error.message);
            }

            resolve(results);
        });
    });
}

async function getArtistByID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM artists WHERE id = ?`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}

async function getArtistInformationByID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT * FROM artists WHERE id=?`;
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }

            resolve(results);
        });
    });
}
/*
async function getArtistAlbumInformationByID(id) {
    return new Promise((resolve, reject) => {
        let stmt = `SELECT
        songs.song, songs.songorder, albums.name as albumname, artists.name as artistname, albums.released as albumreleased
    FROM songs
    
    LEFT JOIN albums
    ON songs.album_id = albums.id
    
    LEFT JOIN artists
    ON albums.artist_id = artists.id
    
    WHERE artists.id = ?
    
    ORDER BY 
    albums.released ASC,
    albums.name ASC,
    songs.songorder ASC`;
    
        let stmtvalues = [id];

        connection.query(stmt, stmtvalues, (error, results, fields) => {
            if (error) {
                reject(console.error(error.message));
            }        

            resolve(results);
            connection.end;
        })
    });
}
*/


module.exports = {
    getAllArtists,
    getArtistByID,
    getArtistInformationByID
}