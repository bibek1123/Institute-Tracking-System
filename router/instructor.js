const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const cookieParser = require("cookie-parser");
require("../db/connection");
const validate = require("../middleware/validate");
const validation = require("../utils/validation/authValidation");
const InstructorController = require('../controllers/instructorController')
const checkRouter = require('../middleware/checkRouter')

router.use(cookieParser());

//instructor routes:

//signup:
router.post("/signup", validate(validation.createKeys), InstructorController.instructorRegistration,);

//login:
router.post("/login", validate(validation.loginKeys), InstructorController.instructorLogin);

//instructors list:
router.get("/list", authenticate, InstructorController.instructorsList);

// get individual instructor data:
router.get("/get/:id", authenticate, InstructorController.singleInstructor);

//get profile:
router.get("/get-profile", authenticate, InstructorController.getProfile);

//update instructor Data:
router.put("/update/:id", authenticate, checkRouter, InstructorController.updateInstructor);

//delete instructor:
router.put("/soft-delete/:id", authenticate, checkRouter, InstructorController.deleteInstructor);

//change password:
router.post("/reset-password", authenticate, validate(validation.changePasswordKeys), InstructorController.changePassword);

module.exports = router
