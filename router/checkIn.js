const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const validate = require("../middleware/validate");
const validation = require("../utils/validation/checkedInOutValidation");
const checkInController = require('../controllers/checkInController')

router.use(cookieParser());

//checkin:
router.post("/", validate(validation.checkInKeys), authenticate, checkInController.checkIn);


module.exports = router
