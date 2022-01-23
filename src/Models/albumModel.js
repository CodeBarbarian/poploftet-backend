const database = require('../Library/database');
let connection = database;


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