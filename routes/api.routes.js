const express = require("express");
const router = express.Router();
const mongoController = require("../controllers/bbdd.controller");

// Rutas de la API
router.get("/movies", mongoController.getAllMovies);
router.post("/createMovie", mongoController.createMovie);
router.put("/editMovie/:id", mongoController.editMovie);
router.delete("/deleteMovie/:id", mongoController.deleteMovie);
router.get("/getFavorites/:email", mongoController.getFavorites);

module.exports = router;
