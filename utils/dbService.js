
const filterService = require("../utils/filterQuery");
const getDocumentByQuery = (model, where, select = [], options = {}) =>
    new Promise((resolve, reject) => {
        model
            .findOne(where, select, options, (err, data) => {
                if (err) reject(err);
                else { resolve(data) }
            })
            .lean();
    });

const createDocument = (model, data) =>
    new Promise((resolve, reject) => {
        model.create(data, (err, result) => {
            if (err) reject(err);
            else resolve(result);
        });
    });

const updateDocument = (model, id, data) =>
    new Promise((resolve, reject) => {
        data.__enc_message = false;
        model.findOneAndUpdate(
            { _id: id },
            { $set: data },
            {
                runValidators: true,
                context: "query",
                new: true,
            },
            (err, data) => {
                if (err) reject(err);
                else resolve(data);
            }
        );
    });


    /*
 * bulkInsert     : update existing document in bulk mongoose document
 * @param  model  : mongoose model
 * @param  filter : {}
 * @param  data   : {}
 */
const bulkUpdate = (model, filter, data) =>
new Promise((resolve, reject) => {
    model.updateMany(filter, data, (err, result) => {
        if (result) {
            resolve(result);
        } else {
            reject(err);
        }
    });
});


    /*
 * getAllDocuments : find all the mongoose document
 * @param  model   : mongoose model
 * @param query    : {}
 * @param options  : {}
 */
const getAllDocuments = async (model, query, options) => {
    query = await filterService.getFilterQuery(query);
    return new Promise((resolve, reject) => {
        model.paginate(query, options, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });
};

const findOneAndDeleteDocument = (model, filter, options = {}) =>
    new Promise((resolve, reject) => {
        model.findOneAndDelete(filter, options, (err, data) => {
            if (err) reject(err);
            else resolve(data);
        });
    });



module.exports = {
    getDocumentByQuery,
    createDocument,
    updateDocument,
    bulkUpdate,
    getAllDocuments,
    findOneAndDeleteDocument
}