const queriesFunctions = require('../models/favorites.model');  //como se interactuará con la base de datos, ahora diremos que devolverá cada uno de esas interacciones

// cuando tengamos todas las favs

//cuando estemos en/getfarites se ejecuta esto y pinta tarjetas
const getFavorites = async (req, res) => {
    let favorites;
    let userEmail = req.params.email;
        favorites = await queriesFunctions.getFavoritesByEmail(userEmail)//segun el email que se haya registrado
   
    res.status(200).json(favorites)
}

const createFavorite = async (req, res) => {
    const newFav = req.body; 
    const response = await queriesFunctions.createFavorite(newFav);
        res.status(201).json({msg:'guardado en favoritos'})
    };



module.exports = {  
    getFavorites,
    createFavorite
}
