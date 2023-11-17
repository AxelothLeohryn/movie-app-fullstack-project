const queries = {
    checkEmail: `
    SELECT *
    FROM users
    WHERE email=$1`
}

module.exports = queries;