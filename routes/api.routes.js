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
/**
 * @swagger
 * /api/movies:
 *   get:
 *     summary: Explora el catálogo completo de películas disponibles.
 *     description: Endpoint para acceder a la lista completa de películas disponibles.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Lista de películas obtenida con éxito
 */
router.get(
  "/movies",
  //   isAuthenticated,
  //   checkToken,
  mongoController.getAllMovies
);

router.get(
  "/movies/:title",
  isAuthenticated,
  checkToken,
  searchController.searchAPI
);
router.get(
  "/movies/details/:id",
  isAuthenticated,
  checkToken,
  searchController.getDetails
);
router.get(
  "/movies/details/:title",
  isAuthenticated,
  checkToken,
  searchController.getCritics
);
/**
 * @swagger
 * /api/createMovie:
 *   post:
 *     summary: Agregar una nueva película.
 *     description: Endopint para crear una nueva película.
 *     tags:
 *       - Movies
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/MovieDetails'
 *     responses:
 *       '201':
 *         description: Película creada con éxito.
 *       '400':
 *         description: Error en la solicitud.
 *       '401':
 *         description: No autorizado. Se requiere autenticación y permisos de administrador.
 */

router.post(
  "/createMovie",
  // isAuthenticated,
  // checkToken,
  // isAdmin,
  mongoController.createMovie
);
/**
 * @swagger
 * /api/editMovie/{id}:
 *   put:
 *     summary: Modificar información de una película.
 *     description: Enpoint para editar una película por ID.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la película
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Película editada con éxito
 */

router.put(
  "/editMovie/:id",
  //   isAuthenticated,
  //   checkToken,
  //   isAdmin,
  mongoController.editMovie
);

/**
 * @swagger
 * /api/deleteMovie/{id}:
 *   delete:
 *     summary: Eliminar una película de la base de datos.
 *     description: Endpoint para eliminar una película por ID.
 *     tags:
 *       - Movies
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la película
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Película eliminada con éxito
 */

router.delete(
  "/deleteMovie/:id",
  //   isAuthenticated,
  //   checkToken,
  //   isAdmin,
  mongoController.deleteMovie
);

router.get(
  "/getFavorites/:email",
  isAuthenticated,
  checkToken,
  mongoController.getFavorites
);
router.post(
  "/favorites",
  isAuthenticated,
  checkToken,
  favoritesController.createFavorite
);
router.delete(
  "/deleteFavorites/:id",
  isAuthenticated,
  checkToken,
  favoritesController.deleteFavorite
);

//Rutas sin protección
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
router.get("/logout", logoutController.logoutFunction);
router.get("/recoverpassword/:email", recoverController.recoverPassword);
router.put("/resetpassword/:recoverToken", recoverController.resetPassword);

//USER--------------------
//-----Search

//RUTA PARA OBTENER RESULTADOS BUSQUEDA
// get (/movies/:title)  --> por dentro va a buscar en nuestra BBDD + en API externa

//RUTA PARA AÑADIR PELICULA A FAVORITOS (BBDD SQL)
//post(/favorites)

//RUTA PARA BORRAR DE FAVORITOS
//delete(/favorites/:favorites.id)
module.exports = router;
