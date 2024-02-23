const { getMonthlyReportService } = require('../services/getMonthlyReportService')
const messageContant = require('../config/constants/messageContant')
exports.getMonthlyReport = async (req, res) => {
    try {
        const result = await getMonthlyReportService(req.params)
        if (result && result.flag === false) {
            res.message = messageContant.MESSAGE.INSTRUCTOR_NOT_FOUND
            return util.badRequestResponse(res)
        }
        res.message = messageContant.MONTHLY_REPORT_MESSAGE.YOUR_MONTHLY_REPORT_FETCH_SUCCESSFULLY
        return util.successResponse(result, res)
    } catch (err) {
        res.message = err.message
        return util.internalServerErrorResponse(res)
    }
};
