const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
require("../auth.js");
const signup = require('../models/signup.model');

const profileFunction = function (req, res) {
    passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" })(req, res);
};

const loginMiddleware = function (req, res, next) {
    passport.authenticate('google', { failureRedirect: '/api/auth/failure' }) (req, res, next);
}

const loginFunction = async function (req, res) {
    let email = req.user.emails[0].value;
    let name = req.user.displayName;
    let emailRegistered = await signup.checkEmail(email);
    if (emailRegistered == false) {
        const payload = {
            name: name,
            email: email,
            check: true
        };
        const token = jwt.sign(payload, `${process.env.secret}`, {
            expiresIn: "30m"
        });
        res.cookie("access-token", token, {
            httpOnly: true,
            sameSite: "strict",
        }).render("dashboard");
    } else {
        let failure = await signup.createGoogle(email, name);
        if (failure != undefined) {
            res.render("inicio");
        } else {
            const payload = {
                name: name,
                email: email,
                check: true
            };
            const token = jwt.sign(payload, `${process.env.secret}`, {
                expiresIn: "30m"
            });
            res.cookie("access-token", token, {
                httpOnly: true,
                sameSite: "strict",
            }).render("dashboard");
        }
    }
    
}


const failureFunction = function (req, res) {
    res.send('Something went wrong.. <a href="/">Back to Log In </a>')
}

module.exports = {
    profileFunction,
    loginFunction,
    loginMiddleware,
    failureFunction,
};