//Importaciones
const fetch = require("../utils/fetch");
//Funciones (req,res)
const searchView = async (req, res) => {
  try {
    if (req.params.title) {
      const title = req.params.title;
      // console.log(title);
      //-----------------Descomentar cuando se cree la funcion de searchFilms-----------------
      //   const movieDetails = await fetch.searchFilms(title);
      //   if (movieDetails.total_results > 0) {
      //     console.log(movieDetails);
      //     res.render("search-details", { movieDetails });
      //   } else {
      //     res.render("error");
      //   }

      //De momento como prueba:
      if (title === "pruebaerror") {
        res.render("search-error");
      } else {
        res.render("search-details", { title });
      }
    } else {
      res.render("search");
    }
  } catch (error) {
    return console.error({ error: error.message });
  }
};

//Exportaciones
module.exports = {
  searchView,
};
