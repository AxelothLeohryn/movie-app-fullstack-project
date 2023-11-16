const express = require("express");
const router = express.Router();
const moviesControllers = require("../controllers/movies.controller");

router.get("/", /*moviesControllers.getMovies*/);

module.exports = router;
