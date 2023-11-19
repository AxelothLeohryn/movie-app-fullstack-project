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

const createGoogle = async (email, name) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        let admin = false;
        const data = await client.query(queries.createGoogle, [email, name, admin])
        result = data.rows
    } catch (err) {
        console.log(err);
        return err;
    } finally {
        client.release();
    } 
}

const createUser = async (email, name, password) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion a bbdd
        let admin = false;
        const data = await client.query(queries.createUser, [email, name, password, admin])
        result = data.rows
        return "success"
    } catch (err) {
        console.log(err);
        return "error";
    } finally {
        client.release();
    } 
}

const signup = {
    checkEmail,
    createGoogle,
    createUser,
}
module.exports = signup;