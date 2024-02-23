const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Instructor = require("../model/instructorSchema");
const messageContant = require('../config/constants/messageContant')
const responseCode = require("../utils/responseCode")
const { profileService } = require('../services/instructor');
const logger = require("../utils/logger");
const { JWT } = require('../config/config')
const { generateTokenAndUpdateInstructor } = require('../services/instructor')
const { v4: uuidv4 } = require('uuid');

//signup:
const instructorRegistration = async (req, res) => {
  let instructor
  try {
    const { fullName, email, password} = req.body
    const instructorExit = await Instructor.findOne({ email: req.body.email });
    if (instructorExit) {
      res.message = messageContant.MESSAGE.EMAIL_ALREADY_EXIST
      return util.validationErrorResponse(res)
    }
    const instructorId = uuidv4();
    instructor = await new Instructor({instructorId, fullName, email, password})
    await instructor.save()
    //generate token:
    const data = await generateTokenAndUpdateInstructor(instructor._id);

    res.message = messageContant.MESSAGE.YOU_ARE_REGISTERED_SUCCESSFULLY
    return util.successResponse(data, res)
  } catch (err) {
    instructor?._id && await Instructor.findOneAndDelete({ _id: instructor._id })
    logger.error("Error -instructorRegistration-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

//login:
const instructorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const instructorLogin = await Instructor.findOne({ email: email })

    if (instructorLogin) {
      const isMatch = await instructorLogin.isPasswordMatch(password);

      if (!isMatch) {
        await Instructor.updateOne({ email: email }, { failed_attempts: instructorLogin.failed_attempts + 1 })
        if (instructorLogin.failed_attempts >= 5) {
          await Instructor.updateOne({ email: email }, { last_attempts: new Date() })
          const diff = new Date().getTime() - instructorLogin.last_attempts.getTime()
          if (Math.round(diff / 60000) >= 5) {
            await Instructor.updateOne({ email: email }, { failed_attempts: 0 })
            res.message = messageContant.MESSAGE.NOW_YOU_CAN_TRY_LOGIN
            return util.validationErrorResponse(res)
          }
          res.message = messageContant.MESSAGE.YOU_EXCEEDED_LOGIN_ATTEMPTS
          return util.validationErrorResponse(res)
        }
        res.message = messageContant.MESSAGE.INVALID_PASSWORD
        return util.validationErrorResponse(res)
      } else {
        //generate token:
        const data = await generateTokenAndUpdateInstructor(instructorLogin._id)
        res.message = messageContant.MESSAGE.YOU_ARE_LOGIN_SUCCESSFULLY
        return util.successResponse(data, res)
      }
    } else {
      res.message = messageContant.MESSAGE.INVALID_CREADIENTIALS
      return util.validationErrorResponse(res)
    }
  } catch (err) {
    logger.error("Error -instructorLogin-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

//instructors list:
const instructorsList = async (req, res) => {
  try {
    const getInstructor = await Instructor.find({}).select('-password -tokens');
    res.message = messageContant.MESSAGE.ALL_INSTRUCTOR_ACCOUNTS_FETCHED_SUCCESSFULLY
    return util.successResponse(getInstructor, res)
  } catch (err) {
    logger.error("Error -instructorsList-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

//get individual instructor data:
const singleInstructor = async (req, res) => {
  try {
    const _id = req.params.id;
    const getInstructor = await Instructor.findById(_id).select('-password -tokens');
    res.message = messageContant.MESSAGE.YOUR_ACCOUNT_FETCHED_SUCCESSFULLY
    return util.successResponse(getInstructor, res)
  } catch (err) {
    logger.error("Error -singleInstructor-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

//get profile:
const getProfile = async (req, res) => {
  try {
    const instructor = req.rootInstructor
    const result = await profileService(instructor);
    res.message = messageContant.MESSAGE.YOUR_PROFILE_RETRIEVE_SUCCESSFULLY
    return util.successResponse(result, res)
  } catch (err) {
    logger.error("Error -getProfile-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

//update instructor data:
const updateInstructor = async (req, res) => {
  try {
    const _id = req.params.id;
    const updateInstructor = await Instructor.findByIdAndUpdate(_id, req.body, {
      new: true,
    }).select('-password -tokens');

    res.message = messageContant.MESSAGE.YOUR_ACCOUNT_UPDATED_SUCCESSFULLY
    return util.successResponse(updateInstructor, res)

  } catch (err) {
    logger.error("Error -updateInstructor-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

//soft-delete instructor:
const deleteInstructor = async (req, res) => {
  try {
    const _id = req.params.id;
    const instructor = await Instructor.findById(_id)
    if (instructor.canNotDel) {
      throw new Error(messageContant.MESSAGE.YOUR_ACCOUNT_CAN_NOT_BE_DELETED)
    }
    await Instructor.updateOne({ _id: _id }, req.body);
    res.message = messageContant.MESSAGE.YOUR_ACCOUNT_DELETED_SUCCESSFULLY
    return util.successResponse({}, res)

  } catch (err) {
    logger.error("Error -deleteInstructor-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

//change password:
const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const isMatch = await req.rootInstructor.isPasswordMatch(currentPassword);
    if (!isMatch) {
      res.message = messageContant.MESSAGE.CURRENT_PASSWORD_WRONG
      return util.changePasswordFailResponse(res)
    }
    const newhashPassword = await bcrypt.hash(newPassword, 12);
    //update password:
    new Promise((resolve, reject) => {
      Instructor.findByIdAndUpdate(req.instructorId, {
        $set: {
          password: newhashPassword,
        },
      }, (err, data) => {
        if (err) reject(err);
        else resolve(data);
      });
    });
    res.message = messageContant.MESSAGE.PASSWORD_RESET_SUCCESSFULLY
    return util.successResponse({}, res)
  } catch (err) {
    logger.error("Error -changePassword-", err)
    res.message = err.message
    return util.internalServerErrorResponse(res)
  }
}

module.exports = {
  instructorRegistration, instructorLogin, instructorsList, singleInstructor, getProfile, updateInstructor, deleteInstructor, changePassword
}