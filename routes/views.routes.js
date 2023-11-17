const express = require("express");
const router = express.Router();

const dashboardController = require("../controllers/dashboard.controller");
const searchController = require("../controllers/search.controller");
const moviesControllers = require("../controllers/movies.controller");

router.get("/", function (req, res) {
  res.render("inicio");
});
router.get("/dashboard", dashboardController);
router.get("/search/:title?", searchController.searchView);
router.get("/movies", /*moviesControllers.getMovies*/);





//   [GET] / Vista de inicio de la app
// [GET] /dashboard Panel de control
// [GET] /search/:title Vista detalle de la película
// [GET] /search Buscador de películas
// [GET] /movies Mis películas
// [POST] /signup Registrarse en la aplicación
// [POST] /login Hacer login en la aplicación
// [POST] /logout Salir
// [POST] /createMovie Crear película
// [PUT] /editMovie/:id Editar película
// [DELETE] /removeMovie Borrar película
// [GET] /recoverpassword Recuperar password
// [GET] /restorepassword Cambiar password
module.exports = router;