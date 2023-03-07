const { Pool } = require("pg");

const client = new Pool({

}); //Configuring PostgresSQL Database

module.exports = client;