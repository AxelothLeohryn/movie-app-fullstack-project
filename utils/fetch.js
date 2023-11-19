//Importaciones
require("dotenv").config();
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${process.env.API_KEY}`,
  },
};
//Funciones que hacen fetch a API externa------------------------------------------------------------------------
async function searchFilmsExternalAPI(title) {
  const page = 1; //De momento solo buscamos 1a página (20 resultados).
  //Llamada a la API externa para buscar, devolvemos array de objetos
  try {
    let results = [];
    results = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`,
      options
    ).then((res) => res.json());
    // console.log(results);
    return results;
  } catch (error) {
    return {
      message: error.message,
    };
  }
}
async function searchFilmDetailsExternalAPI(id) {
  //El id lo vamos a obtener del objeto en el que clickeamos para "ver detalles"
  //Llamada a la API para buscar detalles de una película, devolvemos objeto con detalles
  //   try {
  //     return await fetch(............ url busqueda por id)
  //   } catch (error) {
  //     return {
  //       message: error.message,
  //     };
  //   }
}

//Funciones de prueba (requiere descomentar require(dotenv).config())
// searchFilmsExternalAPI("star wars");
// searchFilms("star wars");

//Exportaciones
module.exports = {
  searchFilmsExternalAPI,
  searchFilmDetailsExternalAPI,
};
