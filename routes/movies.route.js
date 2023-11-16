const express = require("express");
const moviesControllers = require("../controllers/movies.controller");

moviesRouters.get("/", moviesControllers.getMovies);
