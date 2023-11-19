const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signup.controller");
const GoogleController = require("../controllers/google.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");

router.post("/signup", signupController.signupFunction);
router.get("/auth/google", GoogleController.profileFunction);
router.get("/google/callBack?", GoogleController.loginMiddleware, GoogleController.loginFunction);
router.get("/auth/failure", GoogleController.failureFunction);
router.post("/login", loginController.loginMiddleware, loginController.loginFunction);
router.post("/logout", logoutController.logoutFunction);

module.exports = router;