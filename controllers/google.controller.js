const jwt = require("jsonwebtoken");
const passport = require("passport");
require("dotenv").config();
require("../auth.js");
const signup = require('../models/signup.model');
const login = require('../models/login.model');

const profileFunction = function (req, res) {
    passport.authenticate("google", { scope: ['email', 'profile'], prompt: "select_account" })(req, res);
};

const loginMiddleware = function (req, res, next) {
    try {
        passport.authenticate('google', { failureRedirect: '/api/auth/failure' }, async (err, user, info) => {
            let email = user.emails[0].value;
            let name = user.displayName;
            let userexists = await login.datosEmail(email);
            if (Object.keys(userexists).length === 0) {
                let failure = await signup.createGoogle(email, name);
                if (failure != undefined) {
                    res.redirect("/");
                } else {
                    userexists = await login.datosEmail(email);
                }
            }
            req.login(userexists, (err) => {
                if (err) {
                    return res.redirect("/");
                }
                return next();
            });
        }) (req, res, next);
    } catch (error) {
        console.log('Error en loginMiddleware:', error);
        res.redirect("/");
    } 
}


const loginFunction = async function (req, res) {
    let response = await fetch("http://localhost:3000/api/google/success").then(res => res.json());
    if (response == "success") {
        res.redirect("/dashboard");
    } else {
        res.redirect("/")
    } 
}

const cookieFunction = async function (req, res) {
    let email = req.user.email;
    let name = req.user.name;
    const payload = {
        name: name,
        email: email,
        check: true
    };
    const token = jwt.sign(payload, `${process.env.secret}`, {
        expiresIn: "30m"
    });
    console.log(token);
    res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
        }).status(200).json("success")
}



const failureFunction = function (req, res) {
    res.send('Something went wrong.. <a href="/">Back to Log In </a>')
}

module.exports = {
    profileFunction,
    loginFunction,
    loginMiddleware,
    failureFunction,
    cookieFunction
};