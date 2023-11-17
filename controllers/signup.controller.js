const signup = require('../models/signup.model');

const signupFunction = async (req, res) => {
    const {name, email, password} = req.body;
    let emailAvailable = await signup.checkEmail(email);
    if (emailAvailable == false) {
        res.status(200).json(emailAvailable);
    } else {
        
    }
    
}

module.exports = {
    signupFunction
}