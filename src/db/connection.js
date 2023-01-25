const Pool = require('pg').Pool
require('dotenv').config()

const config = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
}

const pool = new Pool(config)

module.exports = pool
