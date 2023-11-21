require("dotenv").config();
const jwt = require("jsonwebtoken");

async function checkToken(req, res, next) {
  const accessToken = await req.cookies['access-token'];
  const secretKey = process.env.secret;
  jwt.verify(accessToken, secretKey, (err, decoded) => {
      if (err) {
        // El token no es válido o ha expirado
        req.session.destroy();
        res.clearCookie("access-token");
        res.render('tokenExpirado');
      } else {
        // El token es válido y decodificado contiene la información del token
          return next();
      }
  });

}

module.exports = checkToken;