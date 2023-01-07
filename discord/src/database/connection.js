require('dotenv').config({path: "../.env"})
const Redis = require("ioredis")
const { Logger } = require("../../Log/log");
const __Log = new Logger();
const { exit } = require('process');


function getDatabase() {
    try {
        const __Database = new Redis(
            {
                port: process.env.REDIS_PORT || 6379,
                host: process.env.REDIS_HOST || 'localhost',
                password: process.env.REDIS_PW || ''
            }
        )
        __Log.info("Successfully connected to database!")
        return __Database
    } catch (e) {
        __Log.fatal(`Error while trying to connect to database - ${e}`)
        exit();
    }
}



module.exports = { getDatabase }