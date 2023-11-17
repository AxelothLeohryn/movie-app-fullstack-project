const express = require("express");
const router = express.Router();
const moviesControllers = require("../controllers/movies.controller");

// router.use((req, res, next) => {
//   req.user = {
//     username: "prueba",
//     trueAdmi: true,
//   };

//   req.trueAdmi = req.user && req.user.trueAdmi;
//   next();
// });

router.get("/", moviesControllers.getMovies);

module.exports = router;
