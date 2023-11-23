const queries = require('../seed/favorites.queries')
const pool = require('../config/db_pgsql')


// GET
const getFavoritesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // cuand haya alguien conectado, es decir, registrado
        console.log("conectando a sql favoritos");
        const data = await client.query(queries.getAllFavoritesByEmail, [email]) // nos dará todas las pelis que haya guardado ese email
        result = data.rows;
        console.log("Resultado de favoritos sql: " + result);
        return result
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    }
}


const deleteById = async (id, email) => {
    let client, result;
    try {
        client = await pool.connect(); 
        const data = await client.query(queries.deleteFavoriteById, [id, email]) //pasamos por parámetro la id a borrar
        return "Success!"
    } catch (err) {
        console.log(err);
        return "Error";
    } finally {
        client.release();
    }
}

// cuando demos el botón de corazón, ejecuta esta función 

const createFavorite = async (movie) => {
    
    const {email, movie_id} = movie;
   
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.createFavorite,[email,movie_id])
        result = data.rowCount
        return "Success!"
    } catch (err) {
        console.log(err);
        return "error"
    } finally {
        client.release();
    }
}



module.exports = {
    getFavoritesByEmail,
    deleteById,
    createFavorite

}