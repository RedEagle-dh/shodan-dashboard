require('dotenv').config({path: "../.env"});
const connection = require('mysql2');

module.exports = connection.createPool({
    host: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    waitForConnections: true,
    connectionLimit: 100,
    queueLimit: 0
});