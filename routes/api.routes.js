const express = require("express");
const router = express.Router();


const searchController = require("../controllers/search.controller");



//RUTA PARA 

//USER--------------------
//-----Search

//RUTA PARA OBTENER RESULTADOS BUSQUEDA
// get (/movies/:title)  --> por dentro va a buscar en nuestra BBDD + en API externa
router.get("/movies/:title", searchController.searchAPI);

//RUTA PARA OBTENER FAVORITOS POR USUARIO
//get(/favorites/:email)  <--- checkear que el usuario logueado es el del email

//RUTA PARA AÑADIR PELICULA A FAVORITOS (BBDD SQL)
//post(/favorites)

//RUTA PARA BORRAR DE FAVORITOS
//delete(/favorites/:favorites.id)




//ADMIN-----------------
// RUTA PARA OBTENER TODAS LAS PELIS DE MONGODB
// get(/localmovies)

//CREAR PELICULA
//post(/createMovie)

//EDITAR PELICULA
//put(/editMovie/:id)

//BORRAR PELICULA
//delete(/deleteMovie/:id)

const signupController = require("../controllers/signup.controller");
const GoogleController = require("../controllers/google.controller");
const loginController = require("../controllers/login.controller");
const logoutController = require("../controllers/logout.controller");

router.post("/signup", signupController.signupFunction);
router.get("/auth/google", GoogleController.profileFunction);
router.get("/google/callBack?", GoogleController.loginMiddleware, GoogleController.loginFunction);
router.get("/auth/failure", GoogleController.failureFunction);
router.post("/login", loginController.loginMiddleware, loginController.loginFunction);
router.post("/logout", logoutController.logoutFunction);


module.exports = router;