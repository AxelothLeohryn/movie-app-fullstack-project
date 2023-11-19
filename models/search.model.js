//cosas para conectarse a mongodb

const fetch = require("../utils/fetch");

//funcion de busqueda en nuestra BBDD morgan
async function searchFilmsLocalDB(query) {
  //Buqueda en nuestra BBDD (películas creadas/editadas), devuelve array de objetos
  // try {
  //   let results = [];
  //   results = await fetch(
  //     `ENDPOINT NUESTRA API`,
  //     options
  //   ).then((res) => res.json());
  //   console.log(results)
  // } catch (error) {
  //   return {
  //     message: error.message,
  //   };
  // }
}

async function searchFilmDetailsLocalDB(id) {}
async function searchFilms(title) {
  //Funcion que va a juntar los resultados de ambos search: searchFilmsLocalDB + searchFilmsExternalAPI
  let results = [];
  //   let internalDBResults = await searchFilmsLocalDB(title);
  //   for (movie of internalDBResults.results) {
  //     results.push(movie);
  //   }
  let externalApiResults = await fetch.searchFilmsExternalAPI(title);
  console.log(externalApiResults);
  for (movie of externalApiResults) {
    results.push(movie);
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
