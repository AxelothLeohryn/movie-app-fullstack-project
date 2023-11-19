function checkLogin(req, res, next) {
    if (req.user ) {
      return next();
    }
    res.redirect('/');
}

module.exports = checkLogin;
