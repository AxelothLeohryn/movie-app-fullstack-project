const session = require("express-session");

const logoutFunction = function (req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.session.destroy();
        res.clearCookie("access-token");
        res.render("inicio");
    });
};

module.exports = {
    logoutFunction
}