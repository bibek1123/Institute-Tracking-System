
const { ObjectId } = require('mongodb')
const checkQuery = async (bodyData, collection) => {
    try {
        if (bodyData.query.categoryId) {
            bodyData.query.categoryId = ObjectId(bodyData.query.categoryId)
        }
        if (bodyData.query.productId) {
            bodyData.query.productId = ObjectId(bodyData.query.productId)
        }
        return bodyData.query
    }
    catch (err) {
        logger.error("Error -checkQuery-", err)
        throw new Error(err)
    }

}
module.exports = {
    checkQuery
}