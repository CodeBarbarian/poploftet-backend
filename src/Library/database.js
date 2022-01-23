/**
 * This file is meant to be the primary database file where all the database instances are called from
 */
/**
 * Including required modules
 */
let mysql = require('mysql');

/**
 * Let us just connect to the mysql database
 */
let connection = mysql.createConnection({
    host: process.env.DB_HOSTNAME,
    user: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

module.exports = {
    connection
}