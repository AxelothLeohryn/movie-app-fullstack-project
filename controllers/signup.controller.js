const bcrypt = require('bcrypt');
const saltRounds = 10;
const signup = require('../models/signup.model');
const loginController = require("../controllers/login.controller");

const signupFunction = async (req, res) => {
    const {name, email, password} = req.body;
    let emailAvailable = await signup.checkEmail(email);
    if (emailAvailable == false) {
        res.status(200).json(emailAvailable);
    } else {
        const hashPassword = await bcrypt.hash(password, saltRounds);
        let userCreated = await signup.createUser(email, name, hashPassword);
        if (userCreated == "error") {
            res.status(200).json(userCreated);
        } else {
            const datos = {
                email: email,
                password: password
            };
            const opciones = {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos) 
            };
            let response = await fetch("http://localhost:3000/api/login", opciones).then(res => res.json());
            res.status(200).json(response);
        }
    }
    
}

module.exports = {
    signupFunction
}