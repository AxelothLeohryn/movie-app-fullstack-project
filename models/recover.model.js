const queries = require('./queries')
const pool = require('../config/db_pgsql')

const putPassword = async (email, password) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.putPassword, [email, password])
        result = data.rows
        return "success"
    } catch (err) {
        console.log(err);
        return false;
    } finally {
        client.release();
    } 
}

const recover = {
    putPassword,
}

module.exports = recover;