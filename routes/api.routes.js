const express = require("express");
const router = express.Router();
const mongoController = require("../controllers/bbdd.controller");

const signupController = require("../controllers/signup.controller");
const GoogleController = require("../controllers/google.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const isAuthenticated = require("../middlewares/isAuthenticated");

const searchController = require("../controllers/search.controller");

// Rutas de la API
router.get("/movies", mongoController.getAllMovies);
router.get("/movies/:title", searchController.searchAPI);
router.get("/movies/details/:id", searchController.getDetails);
router.post("/createMovie", mongoController.createMovie);
router.put("/editMovie/:id", mongoController.editMovie);
router.delete("/deleteMovie/:id", mongoController.deleteMovie);
router.get("/getFavorites/:email", mongoController.getFavorites);

//RUTA PARA

router.post("/signup", signupController.signupFunction);
router.get("/auth/google", GoogleController.profileFunction);
router.get(
  "/google/callBack?",
  GoogleController.loginMiddleware,
  GoogleController.loginFunction
);
router.get("/google/success", isAuthenticated, GoogleController.cookieFunction);
router.get("/auth/failure", GoogleController.failureFunction);
router.post(
  "/login",
  loginController.loginMiddleware,
  loginController.loginFunction
);
router.post("/logout", logoutController.logoutFunction);

//RUTA PARA

//USER--------------------
//-----Search

//RUTA PARA OBTENER RESULTADOS BUSQUEDA
// get (/movies/:title)  --> por dentro va a buscar en nuestra BBDD + en API externa

//RUTA PARA OBTENER FAVORITOS POR USUARIO
//get(/favorites/:email)  <--- checkear que el usuario logueado es el del email

//RUTA PARA AÑADIR PELICULA A FAVORITOS (BBDD SQL)
//post(/favorites)

//RUTA PARA BORRAR DE FAVORITOS
//delete(/favorites/:favorites.id)

router.post("/signup", signupController.signupFunction);
router.get("/auth/google", GoogleController.profileFunction);
router.get(
  "/google/callBack?",
  GoogleController.loginMiddleware,
  GoogleController.loginFunction
);
router.get("/auth/failure", GoogleController.failureFunction);
router.post(
  "/login",
  loginController.loginMiddleware,
  loginController.loginFunction
);
router.post("/logout", logoutController.logoutFunction);

module.exports = router;
