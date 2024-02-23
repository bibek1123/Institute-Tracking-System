const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const validate = require("../middleware/validate");
const validation = require("../utils/validation/checkedInOutValidation");
const monthlyReportController = require('../controllers/monthlyReportController')

router.use(cookieParser());

//checkin:
router.get("/:instructorId/:year/:month", validate(validation.monthlyReportKeys), authenticate, monthlyReportController.getMonthlyReport);

module.exports = router