//Importaciones
//apiKey....


const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      `Bearer ${process.env.API_KEY}`,
  },
};
//Funciones que tengan que ver con hacer un fetch:
async function searchFilms(query) {
  //Llamada a la API para buscar, devolvemos array de objetos
  //   try {
  //     return await fetch(............. url busqueda movies)
  //   } catch (error) {
  //     return {
  //       message: error.message,
  //     };
  //   }
}

async function searchFilmDetails(id) {
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

//Exportaciones
module.exports = {
  searchFilms,
  searchFilmDetails,
};