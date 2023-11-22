const getInicio = function (req, res) {
    res.render("inicio");
};

const getRecover = function (req, res) {
    res.render("recoverPassword");
};

const getGoogle = function (req, res) {
    res.render("inicioExito");
};

module.exports = {
    getInicio,
    getRecover,
    getGoogle
};