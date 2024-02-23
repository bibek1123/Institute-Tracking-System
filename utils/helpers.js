const moment = require('moment-timezone')
const crypto = require('crypto');
const randomString = async (length, timestamp = false) => {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    const unixTimestamp = moment().unix()
    const middlePoint = Math.round(length / 2);
    for (let i = length; i > 0; --i) {
        if ((i === middlePoint) && timestamp) {
            result += unixTimestamp;
        } else {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
    }
    return result;
}

const updateDependentDocuments = async (relations) => {
    await Promise.all(_.map(relations, async (relation) => {
        if (relation.data && relation.filter && relation.model) {
            const model = require(`../model/${relation.model}`);
            await model.updateMany(relation.filter, relation.data);
        }
    }))
}

const paginator = (items, page, per_page) => {
    page = page || 1,
        per_page = per_page || 10,
        offset = (page - 1) * per_page,
        paginatedItems = items.slice(offset).slice(0, per_page),
        total_pages = Math.ceil(items.length / per_page);
    return {
        docs: paginatedItems,
        page: page,
        limit: per_page,
        prevPage: page - 1 ? page - 1 : null,
        nextPage: (total_pages > page) ? page + 1 : null,
        totalDocs: items.length,
        totalPages: total_pages,
    };
}

const generateXClassSignature = async (uri, body, secret) => {
    try {
        let hmac = crypto.createHmac('sha256', Buffer.from(secret, 'base64'));
        if (body === "") {
            hmac.update(uri);
            return hmac.digest('base64');
        } else {
            hmac.update(uri + JSON.stringify(body));
            return hmac.digest('base64');
        }
    } catch (err) {
        logger.error("Error -generateXClassSignature-", err)
        throw new Error(err)
    }
}

module.exports = {
    randomString,
    updateDependentDocuments,
    paginator,
    generateXClassSignature
}