const responseCode = require('./responseCode')
const { RESPONSE_CODE } = require('../config/constants/responseCodeConstant')

exports.successResponse = (data, res) => {
    return res.status(responseCode.success).json({
        code: RESPONSE_CODE.DEFAULT,
        message: res.message,
        data: data,
    });
};

exports.validationErrorResponse = (res) => {
    return res.status(responseCode.validationError).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    });
};

exports.internalServerErrorResponse = (res) => {
    return res.status(responseCode.internalServerError).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    });
};


exports.UnauthorizedResponse = (res) => {
    return res.status(responseCode.Unauthorized).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
        data: {},
    });
};

exports.changePasswordFailResponse = (res) => {
    return res.status(responseCode.validationError).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
    });
};

exports.badRequestResponse = (res) => {
    return res.status(responseCode.badRequest).json({
        code: RESPONSE_CODE.ERROR,
        message: res.message,
    });
};