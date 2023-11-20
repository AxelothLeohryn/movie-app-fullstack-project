const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const login = require('../models/login.model');

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser(async (email, done) => {
  try {
    const user = await login.datosEmail(email);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

passport.use(new LocalStrategy({ usernameField: 'email' }, async (email, password, done) => {
  try {
    let emailSigned = await login.datosEmail(email);
    if (Object.keys(emailSigned).length === 0) {
      return done(null, false, { message: 'Usuario no encontrado' });
    } else {
        const match = await bcrypt.compare(password, emailSigned.password);
        if(match){
           const user = emailSigned;
           return done(null, user);
        } else {
          return done(null, false, { message: 'Credenciales incorrectas' });
        }
    }   
    } catch (error) {
    return done(error);
  }
}));

module.exports = passport;