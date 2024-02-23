const messageContant = require('../config/constants/messageContant')
const jwt = require("jsonwebtoken");
const { JWT } = require('../config/config');
const Instructor = require('../model/instructorSchema')


// const instructorRegistrationService = async (instructor) => {
//     try {
//         return await Instructor.findOne({ _id: instructor._id }).populate(["gender", "location"]).select('-password -tokens')
//     } catch (err) {
//         logger.error("Error -profileService-", err)
//         throw new Error(err)
//     }
// }

const profileService = async (instructor) => {
    try {
        return await Instructor.findOne({ _id: instructor._id }).populate(["gender", "location"]).select('-password -tokens')
    } catch (err) {
        logger.error("Error -profileService-", err)
        throw new Error(err)
    }
}

const generateTokenAndUpdateInstructor = async function (instructorId) {
    try {
        const token = jwt.sign({ _id: instructorId }, JWT.SECRET_KEY, {
            expiresIn: JWT.JWT_TOKEN_EXPIRE,
        })
        const instructor = await Instructor.findOneAndUpdate({ _id: instructorId }, { $push: { tokens: { token } } }, { new: true }).select("-password -tokens").lean()
        return { ...instructor, token };
    } catch (err) {
        logger.error("Error - generateTokenAndUpdateInstructor-", err)
        throw new Error(err)

    }
};
module.exports = {
    profileService,
    generateTokenAndUpdateInstructor
}