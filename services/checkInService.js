const Instructor = require('../model/instructorSchema');
exports.checkInService = async (bodyData) => {
    try {
        const { instructorId, checkInTime } = bodyData;
        const instructor = await Instructor.findOne({ instructorId });
        if (!instructor) return false
        if (instructor.checkIns.length > instructor.checkOuts.length) return { flag: 'cannot checkin' }
        const parsedCheckInTime = new Date(checkInTime)
        for (let i = 0; i < instructor.checkIns.length; i++) {
            const existingCheckIn = instructor.checkIns[i];
            const existingCheckOut = instructor.checkOuts[i];

            if (parsedCheckInTime >= existingCheckIn && parsedCheckInTime <= existingCheckOut) {
                return { flag: 'Overlapping check-in time' }
            }
        }
        instructor.checkIns.push(parsedCheckInTime);
        await instructor.save();
        return instructor
    } catch (err) {
        logger.error("Error -checkInService-", err)
        throw new Error(err)
    }
};