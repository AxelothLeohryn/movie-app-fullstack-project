const express = require("express");
const router = express.Router();
const bbddController = require("../controllers/bbdd.controller");

const signupController = require("../controllers/signup.controller");
const GoogleController = require("../controllers/google.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");
const favoritesController = require("../controllers/favorites.controller");

const searchController = require("../controllers/search.controller");


// Rutas de la API
router.get("/movies", bbddController.getAllMovies);
router.post("/createMovie", bbddController.createMovie);
router.put("/editMovie/:id", bbddController.editMovie);
router.delete("/deleteMovie/:id", bbddController.deleteMovie);
router.get("/getFavorites/:email", favoritesController.getFavorites);
router.post("/favorites",favoritesController.createFavorite)
// router.delete("/deleteFavorites/:id", favoritesController.);


//RUTA PARA 

//USER--------------------
//-----Search

//RUTA PARA OBTENER RESULTADOS BUSQUEDA
// get (/movies/:title)  --> por dentro va a buscar en nuestra BBDD + en API externa
router.get("/movies/:title", searchController.searchAPI);



//RUTA PARA AÑADIR PELICULA A FAVORITOS (BBDD SQL)
//post(/favorites)

//RUTA PARA BORRAR DE FAVORITOS
//delete(/favorites/:favorites.id)

router.post("/signup", signupController.signupFunction);
router.get("/auth/google", GoogleController.profileFunction);
router.get("/google/callBack?", GoogleController.loginMiddleware, GoogleController.loginFunction);
router.get("/auth/failure", GoogleController.failureFunction);
router.post("/login", loginController.loginMiddleware, loginController.loginFunction);
router.post("/logout", logoutController.logoutFunction);


module.exports = router;

