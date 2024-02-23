const { checkOutService } = require('../services/checkOutService')
const messageContant = require('../config/constants/messageContant')
exports.checkOut = async (req, res) => {
    try {
        const result = await checkOutService(req.body)
        if (result && result.flag === "No previos checkin found") {
            res.message = messageContant.CHECKED_OUT_MESSAGE.NO_CHECKED_IN_FOUND
            return util.badRequestResponse(res)
        }
        if (result && result.flag === "Overlap or equal slots") {
            res.message = messageContant.CHECKED_OUT_MESSAGE.EARLIE_CHECKED_OUT
            return util.badRequestResponse(res)
        }
        if (result) {
            res.message = messageContant.CHECKED_OUT_MESSAGE.CHECKED_OUT_SUCCESSFULLY
            return util.successResponse(result, res)
        }
        res.message = messageContant.MESSAGE.INSTRUCTOR_NOT_FOUND
        return util.badRequestResponse(res)

    } catch (err) {
        res.message = err.message
        return util.internalServerErrorResponse(res)
    }
}