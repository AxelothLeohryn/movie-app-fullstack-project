const express = require("express");
const router = express.Router();
// const searchController = require("../controllers/search.controller");
const fetch = require("../utils/fetch")

router.get("/", (req, res) => {
  res.render("search");
});
router.get("/:title", async (req, res) => {
    const title = req.params.title;
    console.log(title)
  //-----------------Descomentar cuando se cree la funcion de searchFilmByTitle-----------------
  //   const movieDetails = await searchController.searchFilmByTitle(title);
  //   if (movieDetails.total_results > 0) {
  //     console.log(movieDetails);
  //     res.render("film", { movieDetails });
  //   } else {
  //     res.render("error");
  //   }

  //De momento como prueba:
  if (title === "pruebaerror") {
    res.render("search-error");
  } else {
    res.render("search-details", {title});
  }
});

module.exports = router;
