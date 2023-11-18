const express = require("express");
const router = express.Router();

const signupController = require("../controllers/signup.controller");
const GoogleController = require("../controllers/google.controller");

router.post("/signup", signupController.signupFunction);
router.get("/auth/google", GoogleController.profileFunction);
router.get("/google/callBack?", GoogleController.loginMiddleware, GoogleController.loginFunction);
router.get("/auth/failure", GoogleController.failureFunction)

module.exports = router;