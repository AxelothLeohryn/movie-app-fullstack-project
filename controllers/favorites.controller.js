const { use } = require('passport');
const queriesFunctions = require('../models/favorites.model');  //como se interactuará con la base de datos, ahora diremos que devolverá cada uno de esas interacciones

// cuando tengamos todas las favs

//cuando estemos en/getfarites se ejecuta esto y pinta tarjeta

const createFavorite = async (req, res) => {
    const id = req.body.id;
    const email = req.user.email;
    const newFav = {
        email: email,
        movie_id: id
    }
    const response = await queriesFunctions.createFavorite(newFav);
    console.log(response);
    if (response === "Success!") {
        res.status(200).json("Success!")
    } else {
        res.status(400).json("Error")
    }  
};

    const deleteFavorite = async (req, res) => {
        const id = req.params.id;
        const email = req.user.email;
        const response = await queriesFunctions.deleteById(id, email);
        console.log(response);
        if (response === "Success!") {
            res.status(200).json("Success!")
        } else {
            res.status(400).json("Error")
        }
        };

module.exports = {  
    createFavorite,
    deleteFavorite
}
