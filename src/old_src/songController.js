const songModel = require('../Models/songModel');

const getSong = async(req, res, next) => {
    var SongData

    await songModel.getAllSongs().then((result) => {
        SongData = result;
    })

    res.status(200);
    res.json(SongData);
};

module.exports = {
    getSong
}