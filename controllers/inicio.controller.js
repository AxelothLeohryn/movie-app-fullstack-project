const getInicio = function (req, res) {
    res.render("inicio");
};

const getRecover = function (req, res) {
    res.render("recoverPassword");
};

module.exports = {
    getInicio,
    getRecover
};