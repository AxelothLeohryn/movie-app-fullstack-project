const queries = require('./queries')
const pool = require('../config/db_pgsql')

const datosEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.datosEmail, [email])
        result = data.rows
        return result[0] || {};
    } catch (err) {
        console.log(err);
        return {};
    } finally {
        client.release();
    } 
}

const login = {
    datosEmail,
}

module.exports = login;