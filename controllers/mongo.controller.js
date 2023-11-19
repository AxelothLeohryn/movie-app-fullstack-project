const Movie = require("../models/movies");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    const userType = req.user ? req.user.type : "user";

    if (userType === "admin") {
      res.render("admView", { movies });
    } else {
      res.render("userView", { movies });
    }
  } catch (error) {
    res.status(500).json({ error: "Error al obtener todas las películas" });
  }
};

const createMovie = async (req, res) => {
  try {
    const newMovie = new Movie(req.body);
    const savedMovie = await newMovie.save();
    res.json(savedMovie);
  } catch (error) {
    res.status(500).json({ error: "Error al crear la película" });
  }
};

const editMovie = async (req, res) => {
  const movieId = req.params.id;
  const newData = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(movieId, newData, {
      new: true,
    });
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ error: "Error al editar la película" });
  }
};

const deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(movieId);
    res.json(deletedMovie);
  } catch (error) {
    res.status(500).json({ error: "Error al borrar la película" });
  }
};

const getFavorites = async (req, res) => {
  try {
    res.json({ favorites: [] });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllMovies,
  createMovie,
  editMovie,
  deleteMovie,
  getFavorites,
};

// // READ
// const getProduct = async (req, res) => {
//         try {
//             const id = req.params.id;
//             let products = id? await Product.find({id},'-_id -__v') : await Product.find({},'-_id -__v'); //{}
//             res.status(200).json(products); // Respuesta de la API para 1 producto
//         }
//         catch (error) {
//             console.log(`ERROR: ${error.stack}`);
//             res.status(400).json({msj:`ERROR: ${error.stack}`});
//         }
// }

// UPATE
// const editProduct = (req, res) => {
//     res.status(200).send("Producto editado!");
// }

// // DELETE
// const deleteProduct = (req, res) => {
//     res.status(200).send("Producto borrado!. Has borrado:"+req.params.id);
// }

module.exports = {
  createMovie,
  // getProduct,
  // editProduct,
  // deleteProduct
};

// .populate('provider', 'company_name cif address -_id')
