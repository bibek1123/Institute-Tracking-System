const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
const validate = require("../middleware/validate");
const validation = require("../utils/validation/checkedInOutValidation");
const checkOutController = require('../controllers/checkOutController')

router.use(cookieParser());

//checkin:
router.post("/", validate(validation.checkOutKeys),authenticate, checkOutController.checkOut);


module.exports = router;
