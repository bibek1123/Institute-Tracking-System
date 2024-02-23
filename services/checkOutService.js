const Instructor = require('../model/instructorSchema');
const moment = require('moment')
exports.checkOutService = async (bodyData) => {
    try {
        const { instructorId, checkOutTime } = bodyData;
        const instructor = await Instructor.findOne({ instructorId });
        if (!instructor) return false
        if (instructor.checkIns.length <= instructor.checkOuts.length) return { flag: "No previos checkin found" }
        const parsedCheckOutTime = new Date(checkOutTime)
        const lastCheckIn = instructor.checkIns[instructor.checkIns.length - 1];
        if (parsedCheckOutTime <= lastCheckIn) return { flag: "Overlap or equal slots" }
        instructor.checkOuts.push(parsedCheckOutTime);
        await instructor.save();
        return instructor
    } catch (err) {
        logger.error("Error -checkOutService-", err)
        throw new Error(err)
    }
}
