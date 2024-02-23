const joi = require("joi");
const messageContant = require("../../config/constants/messageContant");
exports.createKeys = joi
  .object({
    fullName: joi.string().alphanum().min(3).max(30).required(),
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/\\])(?=.*[^\s]).{6,}$/).required().messages({
      "string.pattern.base": messageContant.MESSAGE.PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
    }),
  })
  .unknown(false);

exports.loginKeys = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/\\])(?=.*[^\s]).{6,}$/).required().messages({
      "string.pattern.base": messageContant.MESSAGE.PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
    }),
  })
  .unknown(false);

exports.changePasswordKeys = joi
  .object({
    currentPassword: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/\\])(?=.*[^\s]).{6,}$/).required().
      messages({
        "string.pattern.base":messageContant.MESSAGE.CURRENT_PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
      }),
    newPassword: joi.string().regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+~`\-={}[\]:;"'<>,.?\/\\])(?=.*[^\s]).{6,}$/).required().
    messages({
      "string.pattern.base": messageContant.MESSAGE.NEW_PASSWORD_MUST_BE_SIX_DIGITS_CHARACTER
    })
  })
  .unknown(false);
