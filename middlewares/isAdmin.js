function checkAdmin(req, res, next) {
    if (req.user.admin == true) {
      return next();
    }
    res.redirect('/');
}

module.exports = checkAdmin;