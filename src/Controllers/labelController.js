const labelModel = require('../Models/labelModel');
const Helper = require('../Library/functions');


const getLabel = async (req, res, next) => {
    /**
     * Variable for storing label data
     */
    var LabelData = []

    await labelModel.getLabel().then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        Helper.sendResponse(res, 404);
    } else {
        Helper.sendResponse(res, 200, LabelData);
    }
};

const getLabelByID = async (req, res, next) => {
    var id = req.params.id;
   
    var LabelData = []

    await labelModel.getLabelByID(id).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        Helper.sendResponse(res, 404);
    } else {
        Helper.sendResponse(res, 200, LabelData);
    }
};

const putLabel = async (req, res, next) => {
    var id = req.params.id;
    var request = req.body;

    var LabelData = []

    if (Helper.isEmpty(id) || Helper.isEmpty(request)) {
        Helper.sendResponse(res, 400);
    } 

    await labelModel.putLabel(id, request).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        Helper.sendResponse(res, 400);
    } else {
        Helper.sendResponse(res, 201, LabelData)
    }
};

const deleteLabel = async (req, res, next) => {
    var id = req.params.id;

    var LabelData = []

    if (Helper.isEmpty(id)) {
        Helper.sendResponse(res, 400);
    }

    await labelModel.deleteLabel(id).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(LabelData)) {
        Helper.sendResponse(res, 404);
    } else {
        Helper.sendResponse(res, 200, LabelData);
    }
};

const postLabel = async (req, res, next) => {
    var RequestBody = req.body;
    var LabelData = [];

    await labelModel.postLabel(RequestBody[0]).then((result) => {
        LabelData = result;
    });

    if (Helper.isEmpty(RequestBody)) {
        Helper.sendResponse(res, 400);
    } else {
        if (Helper.isEmpty(LabelData)) {
            Helper.sendResponse(res, 400);
        } else {
            Helper.sendResponse(res, 201, LabelData);
        }
    }
};

module.exports = {
    getLabel,
    getLabelByID,
    putLabel,
    deleteLabel,

    postLabel
}