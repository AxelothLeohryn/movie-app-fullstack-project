const queries = {
    checkEmail: `
    SELECT *
    FROM users
    WHERE email=$1`,
    createGoogle: `
    INSERT INTO users (email, name, admin)
    VALUES ($1, $2, $3)`
}

module.exports = queries;