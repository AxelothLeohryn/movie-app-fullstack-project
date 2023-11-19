const { Pool } = require('pg');

require('dotenv').config()

const connectionString = process.env.ConectionString;
 
const pool = new Pool({
  connectionString,
})
 

module.exports = pool;


