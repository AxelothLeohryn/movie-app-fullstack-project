const queries = require('../seed/favorites.queries')
const pool = require('../config/db_pgsql')


// GET
const getFavoritesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // cuand haya alguien conectado, es decir, registrado
        const data = await client.query(queries.getAllFavoritesByEmail, [email]) // nos dará todas las pelis que haya guardado ese email
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}


const deleteById = async (id) => {
    const {movie_id} = id;
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(queries.deleteFavoriteById, [movie_id]) //pasamos por parámetro la id a borrar
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// cuando demos el botón de corazón, ejecuta esta función 

const createFavorite = async (movie) => {
    
    const {email, movie_id} = movie;
   
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFavorite,[email,movie_id])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}



module.exports = {
    getFavoritesByEmail,
    deleteById,
    createFavorite

}