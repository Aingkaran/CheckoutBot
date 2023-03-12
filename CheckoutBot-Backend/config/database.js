const { Pool } = require("pg");
require("dotenv").config();

const client = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dbname: process.env.DB_DBNAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
}); //Configuring PostgresSQL Database

module.exports = client;