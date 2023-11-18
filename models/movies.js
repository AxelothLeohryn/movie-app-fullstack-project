const mongoose = require('mongoose');
require('../config/db_mongo') // Conexión a BBDD MongoDB

// año, director,género,duración, actores, rating, descripcion

const movieDetailsSchema = {
    id: {
        type: Number,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
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
    year: {
        type: Number,
        required:true,
    },
    director: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    length: {
        type: String,
        required: true
    },
    actors: {
        type: String,
        required: true
    }

  
};

const movieSchema = mongoose.Schema(movieDetailsSchema);

const movie = mongoose.model('Movies', movieSchema);

module.exports = movie;