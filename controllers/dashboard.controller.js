const getDashboard = function (req, res) {
    if (req.user.admin === true) {
        res.redirect("/movies")
    } else {
        res.render("dashboard");
    }
};

module.exports = {
    getDashboard
}

