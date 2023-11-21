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
  const page = 1;
  try {
    let results = [];
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${title}&include_adult=false&language=en-US&page=${page}`, options);
    const data = await response.json();
    for (const movie of data.results) {
      const detailsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?language=en-US`, options);
      const movieDetails = await detailsResponse.json();
      const creditsResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/credits?language=en-US`, options);
      const movieCredits = await creditsResponse.json();
      const videosResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/videos?language=en-US`, options);
      const movieVideos = await videosResponse.json();

      const trailers = movieVideos.results.filter(item => item.type === "Trailer");
      const movieFirstTrailer = trailers.length > 0 ? trailers[0].key : null;

      const movieData = {
        id: `ext-${movie.id}`,
        title: movie.title,
        director: movieCredits.crew.find(person => person.job === "Director")?.name,
        year: movie.release_date,
        length: movieDetails.runtime,
        image: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
        genres: movieDetails.genres.map(genre => genre.name),
        actors: movieCredits.cast.slice(0,4).map(person => person.name),
        trailer: `https://www.youtube.com/embed/${movieFirstTrailer}`,
        overview: movieDetails.overview,
      };
      results.push(movieData);
    }
    return results;
  } catch (error) {
    return { message: error.message };
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
