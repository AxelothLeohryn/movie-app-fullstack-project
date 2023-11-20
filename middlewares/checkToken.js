require("dotenv").config();
const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {
  try {
    console.log(req.cookies);
    const accessToken = await req.cookies['access-token'];
    const secretKey = process.env.secret;
    jwt.verify(accessToken, secretKey, (err, decoded) => {
        if (err) {
          // El token no es válido o ha expirado
          req.session.destroy();
          //res.clearCookie("access-token").render('tokenExpirado');
        } else {
          // El token es válido y decodificado contiene la información del token
            return next();
        }
      
    });;
  } catch (error) {
    console.log(error);
  }
}

module.exports = checkToken;