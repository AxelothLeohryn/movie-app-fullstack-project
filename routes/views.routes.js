const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const checkToken = require("../middlewares/checkToken");

const searchController = require("../controllers/search.controller");
const moviesControllers = require("../controllers/movies.controller");
const inicioController = require("../controllers/inicio.controller");
const dashboardController = require("../controllers/dashboard.controller");

router.get("/", inicioController.getInicio);
router.get("/resetpassword/:recoveryToken", inicioController.getRecover);
router.get("/dashboard", isAuthenticated, checkToken, dashboardController.getDashboard);
router.get("/search/:id?", searchController.searchView); //search page if no id, search details if id
router.get("/movies", moviesControllers.getMovies);
router.get("/createMovie", moviesControllers.createMoviesForm);
router.get("/editMovie/:id", moviesControllers.editMoviesForm);

//Ruta temporal para probar view del navbar
router.get("/navbar", (req, res) => {
  res.render("navbar");
});

module.exports = router;
