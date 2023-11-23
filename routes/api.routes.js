const express = require("express");
const router = express.Router();



const isAuthenticated = require("../middlewares/isAuthenticated");
const checkToken = require("../middlewares/checkToken");
const isAdmin = require("../middlewares/isAdmin");

const signupController = require("../controllers/signup.controller");
const GoogleController = require("../controllers/google.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const favoritesController = require("../controllers/favorites.controller");
const recoverController = require("../controllers/recover.controller");
const searchController = require("../controllers/search.controller");
const mongoController = require("../controllers/bbdd.controller");

// Rutas de la API con protección
router.get("/movies", isAuthenticated, checkToken, mongoController.getAllMovies);
router.get("/movies/:title", isAuthenticated, checkToken, searchController.searchAPI);
router.get("/movies/details/:id", isAuthenticated, checkToken, searchController.getDetails);
router.get("/movies/details/:title", isAuthenticated, checkToken, searchController.getCritics);
router.post("/createMovie", isAuthenticated, checkToken, isAdmin, mongoController.createMovie);
router.put("/editMovie/:id", isAuthenticated, checkToken, isAdmin, mongoController.editMovie);
router.delete("/deleteMovie/:id", isAuthenticated, checkToken, isAdmin, mongoController.deleteMovie);
router.get("/getFavorites", isAuthenticated, checkToken, mongoController.getFavorites);
router.post("/favorites", isAuthenticated, checkToken, favoritesController.createFavorite)
router.delete("/deleteFavorites/:id", isAuthenticated, checkToken, favoritesController.deleteFavorite);




//Rutas sin protección
router.post("/signup", signupController.signupFunction);
router.get("/auth/google", GoogleController.profileFunction);
router.get("/google/callBack?", GoogleController.loginMiddleware, GoogleController.loginFunction);
router.get("/auth/failure", GoogleController.failureFunction);
router.post("/login", loginController.loginMiddleware, loginController.loginFunction);
router.get("/logout", logoutController.logoutFunction);
router.get('/recoverpassword/:email', recoverController.recoverPassword);
router.put('/resetpassword/:recoverToken', recoverController.resetPassword);


//RUTA PARA

//USER--------------------
//-----Search

//RUTA PARA OBTENER RESULTADOS BUSQUEDA
// get (/movies/:title)  --> por dentro va a buscar en nuestra BBDD + en API externa



//RUTA PARA AÑADIR PELICULA A FAVORITOS (BBDD SQL)
//post(/favorites)

//RUTA PARA BORRAR DE FAVORITOS
//delete(/favorites/:favorites.id)
module.exports = router;
