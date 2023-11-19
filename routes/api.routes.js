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

module.exports = router;