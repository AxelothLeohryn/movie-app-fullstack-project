//Importaciones
const fetch = require("../utils/fetch")
//Funciones (req,res)
const searchMovieDetails = async (req, res) => {
  async (req, res) => {
    const title = req.params.title;
    console.log(title);
    //-----------------Descomentar cuando se cree la funcion de searchFilmByTitle-----------------
    //   const movieDetails = await fetch.searchFilmByTitle(title);
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
      res.render("search-details", { title });
    }
  };
};

//Exportaciones
module.exports = {
    searchMovieDetails
}
