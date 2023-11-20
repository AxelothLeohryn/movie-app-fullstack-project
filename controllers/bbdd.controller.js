const Movie = require("../models/movies");
const movieModel = require("../models/search.model")
require("../config/mongo_atlas.js");

const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find({});
    res.status(200).json(movies);
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
    res.status(500).json(error.message);
  }
};

const editMovie = async (req, res) => {
  const movieId = req.params.id;
  const newData = req.body;

  try {
    const updatedMovie = await Movie.findOneAndUpdate(
      { id: movieId },
      newData,
      {
        new: true,
      }
    );
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteMovie = async (req, res) => {
  const movieId = req.params.id;
  try {
    const deletedMovie = await Movie.findOneAndDelete({ id: movieId });
    res.json(deletedMovie);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getFavorites = async (req, res) => {
  try {
    res.json({ favorites: [] });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const findMovies = async (req, res) => {
  const movieTitle = req.params.title;
  try {
    const searchResults = movieModel.findMovies(movieTitle);
    
    res.json(searchResults);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const controllers = {
  getAllMovies,
  createMovie,
  editMovie,
  deleteMovie,
  getFavorites,
  findMovies,
};
module.exports = controllers;