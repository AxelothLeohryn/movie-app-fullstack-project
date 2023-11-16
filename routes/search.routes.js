const express = require("express");
const router = express.Router();
const searchController = require("../controllers/search.controller");


router.get("/", (req, res) => {
  res.render("search");
});
router.get("/:title?", searchController.searchMovieDetails);

module.exports = router;