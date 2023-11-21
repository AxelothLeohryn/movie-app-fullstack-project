const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

// año, director,género,duración, actores, rating, descripcion

const movieDetailsSchema = {
    id: {
        type: String,
        required: true,
        default: function() {
          return `int-${this._id}`;
        }
      },
    title: {
        type: String,
        required: true,
        unique: true
    },
    director: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required:true,
    },
    length: {
        type: String,
        required: true
    },
    image: {
        type: String,
        validate: {
            validator: function(url){
                return url.endsWith('.jpg') || url.endsWith('.png');
            },
            message: "Por favor, solo imágenes JPG o PNG"
        }
    },
    genres: [
        {
            type: String,
        required: true
    }
    ],
    actors: [
      {
          type: String,
      required: true
  }
  ],
    trailer: {
        type: String,
        required: true
    },
    overview: {
        type: String,
        required: true
    }
};

const movieSchema = mongoose.Schema(movieDetailsSchema);

const movie = mongoose.model('Movies', movieSchema);

module.exports = movie;
