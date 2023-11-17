const queries = require('./queries')
const pool = require('../config/db_pgsql')

const checkEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        const data = await client.query(queries.checkEmail, [email])
        result = data.rows
        let emailAvailable;
        if (result.length == 0) {
            emailAvailable = true;
        } else {
            emailAvailable = false;
        }
        return emailAvailable
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    } 
}

const signup = {
    checkEmail
}
module.exports = signup;