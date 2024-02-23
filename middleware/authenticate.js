const jwt = require("jsonwebtoken");
const Instructor = require("../model/instructorSchema");
const messageContant = require('../config/constants/messageContant')
const logger = require("../utils/logger");
const { JWT } = require('../config/config')

const authenticate = async (req, res, next) => {
  try {

    const token = req.headers.authorization;
    const verifyToken = jwt.verify(token, JWT.SECRET_KEY);

    const rootInstructor = await Instructor.findOne({
      _id: verifyToken._id,
      "tokens.token": token,
    });

    if (!rootInstructor) {
      throw new Error(messageContant.MESSAGE.INSTRUCTOR_NOT_FOUND);
    }
    req.token = token;
    req.rootInstructor = rootInstructor;
    req.instructorId = rootInstructor._id;
    req.instructorEmail = rootInstructor.email;
    next();
  } catch (err) {
    logger.error("Error - authenticate-", err)
    res.message = err.message
    return util.UnauthorizedResponse(res)
  }
};

module.exports = authenticate;
