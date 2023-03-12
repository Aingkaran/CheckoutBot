const { Pool } = require("pg");
require("dotenv").config();

const client = new Pool({
    host: 'localhost',
    port: '5433',
    dbname: 'CheckoutApp',
    user: 'postgres',
    password: 'Jenitha3!'
}); //Configuring PostgresSQL Database

module.exports = client;