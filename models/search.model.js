//cosas para conectarse a mongodb
require("../config/mongo_atlas.js");
const fetch = require("../utils/fetch");
const Movie = require("../models/movies");
// const api = require("../controllers/bbdd.controller");

//funcion de busqueda en nuestra BBDD morgan
async function searchFilmsLocalDB(title) {
  let movies = await Movie.find({ title: { '$regex': title, $options: 'i' } }); //Case insensitive
  console.log("Movies found local: " + movies);
  return movies;
}

async function searchFilmDetailsLocalDB(id) {
  return await Movie.findOne({ id: id });
}
async function searchFilms(title) {
  //Funcion que va a juntar los resultados de ambos search: searchFilmsLocalDB + searchFilmsExternalAPI
  let results = [];
  let internalDBResults = await searchFilmsLocalDB(title);
  // console.log("Internal DB results: " + internalDBResults);
  for (const result of internalDBResults) {
    results.push(result);
  }
  let externalApiResults = await fetch.searchFilmsExternalAPI(title);
  console.log(externalApiResults);
  for (const result of externalApiResults) {
    results.push(result);
  }
  // console.log(results);
  return results;
}

//Exportaciones
module.exports = {
  searchFilmsLocalDB,
  searchFilmDetailsLocalDB,
  searchFilms,
};
