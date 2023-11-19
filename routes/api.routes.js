const express = require("express");
const router = express.Router();
const mongoController = require("../controllers/mongo.controller");

// Rutas de la API
router.get("/api", mongoController.getAllMovies);
router.post("/api/createMovie", mongoController.createMovie);
router.put("/api/editMovie/:id", mongoController.editMovie);
router.delete("/api/deleteMovie/:id", mongoController.deleteMovie);
router.get("/api/getFavorites", mongoController.getFavorites);

module.exports = router;
