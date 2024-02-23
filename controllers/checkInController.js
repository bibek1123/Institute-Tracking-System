const { checkInService } = require('../services/checkInService')
const messageContant = require('../config/constants/messageContant')
exports.checkIn = async (req, res) => {
    try {
        const result = await checkInService(req.body)
        if(result && result.flag === "cannot checkin"){
            res.message = messageContant.CHECKED_IN_MESSAGE.CANNOT_CHECKED_IN
            return util.badRequestResponse(res)
        }
        if(result && result.flag === "Overlapping check-in time"){
            res.message = messageContant.CHECKED_IN_MESSAGE.OVERLAPING_CHEKED_IN
            return util.badRequestResponse(res)
        }
        if (result) {
            res.message = messageContant.CHECKED_IN_MESSAGE.CHECKED_IN_SUCCESSFULLY
            return util.successResponse(result, res)
        }
        res.message = messageContant.MESSAGE.INSTRUCTOR_NOT_FOUND
        return util.badRequestResponse(res)
    } catch (err) {
        res.message = err.message
        return util.internalServerErrorResponse(res)
    }
};