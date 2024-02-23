const joi = require("joi");
const messageContant = require("../../config/constants/messageContant");
exports.checkInKeys = joi
    .object({
        instructorId: joi.string().required(),
        checkInTime: joi.date().iso().required()
    })
    .unknown(false);

exports.checkOutKeys = joi
    .object({
        instructorId: joi.string().required(),
        checkOutTime: joi.date().iso().required()
    })
    .unknown(false);

exports.monthlyReportKeys = joi
    .object({
        instructorId: joi.string().required(),
        year: joi.number().integer().min(1970).max(2100).required(),
        month: joi.number().integer().min(1).max(12).required(),
    })
    .unknown(false);


exports.changePasswordKeys = joi
    .object({
        currentPassword: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/\\])(?=.*[^\s]).{6,}$/).required().
            messages({
                "string.pattern.base": messageContant.MESSAGE.CURRENT_PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
            }),
        newPassword: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/\\])(?=.*[^\s]).{6,}$/).required().
            messages({
                "string.pattern.base": messageContant.MESSAGE.NEW_PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
            })
    })
    .unknown(false)
