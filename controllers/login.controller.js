const passport = require('../config/passport-config');
const jwt = require("jsonwebtoken");
require("dotenv").config();

const loginFunction = async function (req, res) {
    try {
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
        res.cookie("access-token", token, {
        httpOnly: true,
        sameSite: "strict",
        }).status(200).json("success");
    } catch (error) {
        console.error('Error en loginFunction:', error);
    }
}

const loginMiddleware = async function (req, res, next) {
    try {
        passport.authenticate('local', { failureRedirect: '/api/auth/failure' }, (err, user, info) => {
            if (err) {
                res.status(500).json("error");
            } else if (!user) {
                const message = info.message;
                if (message === "Usuario no encontrado") {
                    res.status(200).json(false);
                } else if (message === "Credenciales incorrectas") {
                    res.status(200).json("error");
                }
            } else {
                req.login(user, (err) => {
                    if (err) {
                        return res.status(500).json("error");
                    }
                    return next();
                });
            }
        })(req, res, next); 
    } catch (error) {
        console.log('Error en loginMiddleware:', error);
        res.status(500).send('Error interno del servidor');
    }
}

module.exports = {
    loginFunction,
    loginMiddleware,
};