const queries = {
    checkEmail: `
    SELECT *
    FROM users
    WHERE email=$1`,
    createGoogle: `
    INSERT INTO users (email, name, admin)
    VALUES ($1, $2, $3)`,
    createUser: `INSERT INTO users (email, name, password, admin)
    VALUES ($1, $2, $3, $4)`,
    datosEmail: `SELECT email, password, admin, name
    FROM users
    WHERE email=$1`,
}

module.exports = queries;