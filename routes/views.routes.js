const express = require("express");
const router = express.Router();

const isAuthenticated = require("../middlewares/isAuthenticated");
const checkToken = require("../middlewares/checkToken");
const isAdmin = require("../middlewares/isAdmin");

const searchController = require("../controllers/search.controller");
const moviesControllers = require("../controllers/movies.controller");
const inicioController = require("../controllers/inicio.controller");
const dashboardController = require("../controllers/dashboard.controller");

router.get("/", inicioController.getInicio);
router.get("/resetpassword/:recoveryToken", inicioController.getRecover);
router.get("/inicioExito", inicioController.getGoogle);
router.get(
  "/dashboard",
  isAuthenticated,
  checkToken,
  dashboardController.getDashboard
);
router.get(
  "/search/:id?",
  isAuthenticated,
  checkToken,
  searchController.searchView
);
router.get("/movies", isAuthenticated, checkToken, moviesControllers.getMovies);
router.get(
  "/createMovie",
  isAuthenticated,
  checkToken,
  isAdmin,
  moviesControllers.createMoviesForm
);
router.get(
  "/editMovie/:id",
  isAuthenticated,
  checkToken,
  isAdmin,
  moviesControllers.editMoviesForm
);

//Ruta temporal para probar view del navbar
router.get("/navbar", (req, res) => {
  res.render("navbar");
});

module.exports = router;
