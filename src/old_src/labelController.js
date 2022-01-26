const labelModel = require('../Models/labelModel');
const Helper = require('../Library/haugstad');

/**
 * Retrieve all the record labels from the database.
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getLabel = async (req, res, next) => {
    /**
     * Variable for storing label data
     */
    var LabelData = []

    await labelModel.getLabel('recordlabels').then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        Helper.sendResponse(res, 404);
    } else {
        Helper.sendResponse(res, 200, LabelData);
    }
};

/**
 * Retreive record label by id from the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const getLabelByID = async (req, res, next) => {
    var id = req.params.id;
    
    var LabelData = []

    // Check if we are able to retreive an ID first
    if (Helper.isEmpty(id)) {
        Helper.sendResponse(res, 404);
    } else {
        await labelModel.getLabelByID('recordlabels', id).then((result) => {
            LabelData = result;
        });

        if (Helper.isEmpty(LabelData)) {
            Helper.sendResponse(res, 404);
        } else {
            Helper.sendResponse(res, 200, LabelData);
        }
    }
};

/**
 * Updates the record label information in the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const putLabel = async (req, res, next) => {
    var id = req.params.id;
    var request = req.body;

    var LabelData = []

    if (Helper.isEmpty(id) || Helper.isEmpty(request)) {
        Helper.sendResponse(res, 400);
    } else {
        await labelModel.updateLabel('recordlabels', id, request).then((result) => {
            LabelData = result;
        });
    
        if (Helper.isEmpty(LabelData)) {
            Helper.sendResponse(res, 400);
        } else {
            Helper.sendResponse(res, 201, LabelData)
        }
    }
};

/**
 * Delete the label from the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const deleteLabel = async (req, res, next) => {
    var id = req.params.id;

    var LabelData = []

    if (Helper.isEmpty(id)) {
        console.log("We are in here")
        Helper.sendResponse(res, 400);
        
    } else {
        await labelModel.deleteLabel('recordlabels', id).then((result) => {
            LabelData = result;
        });
    
        if (Helper.isEmpty(LabelData)) {
            Helper.sendResponse(res, 404);
            console.log("We are actually not returning anything")
        } else {
            Helper.sendResponse(res, 200, LabelData);
        }
    }
};

/**
 * Create a new record inside the record labels table in the database
 * 
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const postLabel = async (req, res, next) => {
    var LabelData = [];
    
    var RequestBody = req.body;

    await labelModel.postLabel('recordlabels', RequestBody).then((result) => {
        LabelData = result;
    });


    // Vluff
    res.json("");
    res.status(200);
};

module.exports = {
    getLabel,
    getLabelByID,
    putLabel,
    deleteLabel,
    postLabel
}