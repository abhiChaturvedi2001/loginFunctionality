const { signUpController, loginController, gettingUser, } = require("../Controller/authController")
const express = require('express');
const { authValidationRegister, authValidationLogin, jwtVerifyToken } = require("../middleware/authValidation");
const router = express.Router();

router.post("/register", authValidationRegister, signUpController);
router.post("/login", authValidationLogin, loginController);
router.get("/user", jwtVerifyToken, gettingUser)
module.exports = router;