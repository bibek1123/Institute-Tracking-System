const Instructor = require('../model/instructorSchema');
const moment = require('moment')
exports.getMonthlyReportService = async (paramsData) => {
    try {
        const { instructorId, month, year } = paramsData;
        const instructor = await Instructor.findOne({ instructorId });
        if (!instructor) return { flag: false }
        const startDate = moment(`${year}-${month}-01`, 'YYYY-MM-DD').toDate();
        const endDate = moment(startDate).endOf('month').toDate();
        const result = await Instructor.aggregate([
            {
                $match: {
                    instructorId: instructorId,
                    $or: [
                        { checkIns: { $gte: startDate, $lte: endDate } },
                        { checkOuts: { $gte: startDate, $lte: endDate } }
                    ]
                }
            },
            {
                $project: {
                    _id: 0,
                    workingHours: {
                        $reduce: {
                            input: { $zip: { inputs: ['$checkIns', '$checkOuts'] } },
                            initialValue: 0,
                            in: {
                                $add: [
                                    '$$value',
                                    { $divide: [{ $subtract: [{ $arrayElemAt: ['$$this', 1] }, { $arrayElemAt: ['$$this', 0] }] }, 3600000] }
                                ]
                            }
                        }
                    }
                }
            }
        ]);
        const totalHours = result.length > 0 ? result[0].workingHours : 0;
        return {
            instructorId,
            month,
            year,
            totalHours
        };
    } catch (err) {
        logger.error("Error -getMonthlyReportService-", err)
        throw new Error(err)
    }
};