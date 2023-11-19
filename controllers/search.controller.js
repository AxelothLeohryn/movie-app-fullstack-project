//Importaciones
const fetch = require("../utils/fetch");
const searchModel = require("../models/search.model")
//Funciones (req,res)
const searchView = async (req, res) => {
  try {
    if (req.params.id) {
      // // Route: /search/id (details of the movie) VISTA DETALLES
      // const id = req.params.id;
      // console.log(title);
      // const movieDetails = await fetch.searchFilmDetails(id);
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
    const results = await searchModel.searchFilms(title);
    // console.log(`Results: `, results);
    res.status(200).json(results);
  } catch (error) {
    console.error(`ERROR in searchAPI: ${error.stack}`);
    res.status(400).json({ msg: `ERROR: ${error.stack}` });
  }
};

//Exportaciones
module.exports = {
  searchView,
  searchAPI,
};
