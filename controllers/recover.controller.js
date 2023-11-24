const transporter = require('../config/nodemailer');
const urlRecoverPassword = process.env.URL_RECOVER;
const jwt = require('jsonwebtoken');
const jwt_secret = process.env.secret;
const saltRounds = 10;
const signup = require('../models/signup.model');
const recoverModel = require('../models/recover.model');

const recoverPassword = async(req, res) => {
    try {
        let emailNotUsed = await signup.checkEmail(req.params.email)
        if (emailNotUsed == false) {
            const recoverToken = jwt.sign({email: req.params.email}, jwt_secret, {expiresIn: '30m'});
        const url = `${urlRecoverPassword}/resetpassword/` + recoverToken;
        await transporter.sendMail({
            to: req.params.email,
            subject: 'Recover Password',
            html: `<h3>Recover Password</h3>
                <a href = ${url}>Click to recover password</a>
                <p>Link will expire in 30 minutes</p>`
        });
        res.status(200).json("success")
        } else {
            res.status(200).json(false)
        }
    } catch (error) {
        res.status(200).json("error")
    } 
};

const resetPassword = async(req, res) => {
    try {
        const recoverToken = req.params.recoverToken;
        const payload = jwt.verify(recoverToken, jwt_secret);
        const password = req.body.password
        const hashPassword = await bcrypt.hash(password, saltRounds);
        let passwordChanged = await recoverModel.putPassword(payload.email, hashPassword);
        if (passwordChanged == "success") {
            res.status(200).json("success");
        } else {
            res.status(200).json(false);
        }   
    } catch (error) {
        res.status(200).json("error");
    }
}

const recover = {
    recoverPassword,
    resetPassword
};

module.exports = recover;