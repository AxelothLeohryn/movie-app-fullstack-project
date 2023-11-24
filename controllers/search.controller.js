//Importaciones
const fetch = require("../utils/fetch");
const searchModel = require("../models/search.model");
const puppeteer = require("../models/puppeteer");
//Funciones (req,res)
const searchView = async (req, res) => {
  try {
    if (req.params.id) {
      // // Route: /search/id (details of the movie) VISTA DETALLES
      res.render("search-details");
    } else {
      // Route: /search
      res.render("search");
    }
  } catch (error) {
    return console.error({ error: error.message });
  }
};

const searchAPI = async (req, res) => {
  const title = req.params.title;
  console.log(`Searching for title: ${title}`);
  try {
    let results = await searchModel.searchFilms(title);
    console.log(`Results: `, results);
    res.status(200).json(results);
  } catch (error) {
    console.error(`ERROR in searchAPI: ${error.stack}`);
    res.status(400).json({ msg: `ERROR: ${error.stack}` });
  }
};

const getDetails = async (req, res) => {
  //Check wether to search in local db or external API according to id
  const id = req.params.id;
  const source = id.split("-")[0];
  const movieId = id.split("-")[1];
  console.log("These are the movie params: " + source, id);
  if (source === "int") {
    try {
      const details = await searchModel.searchFilmDetailsLocalDB(id);
      console.log(`Results: `, details);
      res.status(200).json(details);
    } catch (error) {
      console.error(`ERROR in searchAPI: ${error.stack}`);
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
  } else if (source === "ext") {
    try {
      const details = await fetch.searchFilmDetailsExternalAPI(movieId);
      console.log(`Results: `, details);
      res.status(200).json(details);
    } catch (error) {
      console.error(`ERROR in searchAPI: ${error.stack}`);
      res.status(400).json({ msg: `ERROR: ${error.stack}` });
    }
  }
};

const getCritics = async (req, res) => {
  const title = req.params.title;
  try {
    const critics = await puppeteer.getRatings(title);
    if (critics.length == 0 || critics.message) {
      res.status(400).json(false);
    }
    res.status(200).json(critics);
  } catch (error) {
    res.status(400).json("error");
  }
};

//Exportaciones
module.exports = {
  searchView,
  searchAPI,
  getDetails,
  getCritics
};
