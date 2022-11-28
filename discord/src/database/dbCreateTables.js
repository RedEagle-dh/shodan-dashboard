const pool = require("./connection");

function createDatabase() {
    pool.execute("CREATE DATABASE shodan", (err) => {
        if (err) throw err;
    })
}


function createTables() {
    pool.execute(`CREATE TABLE IF NOT EXISTS shodan.gamecategories 
                            (id INT NOT NULL PRIMARY KEY, 
                            name VARCHAR(255) NOT NULL UNIQUE)`, (err) => {
        if (err) throw err;
    })

    pool.execute(`CREATE TABLE IF NOT EXISTS shodan.user (id INT NOT NULL PRIMARY KEY,
                        userid VARCHAR(45) NOT NULL UNIQUE,
                        messagecount INT NOT NULL DEFAULT 0,
                        voiceseconds INT NOT NULL DEFAULT 0,
                        leavedate VARCHAR(45),
                        botcommands JSON,
                        events JSON)`)

    setTimeout(() => {
        pool.execute(`CREATE TABLE IF NOT EXISTS shodan.games 
                        (id INT NOT NULL PRIMARY KEY, 
                        name VARCHAR(255) NOT NULL, 
                        emoji VARCHAR(45) NOT NULL, 
                        description VARCHAR(255) NOT NULL, 
                        roleid VARCHAR(45) NOT NULL,
                        optinid INT NOT NULL,
                        FOREIGN KEY (optinid) REFERENCES shodan.gamecategories(id) ON DELETE CASCADE)`, (err) => {
            if (err) throw err;
        })
    }, 100)
}

module.exports = { createDatabase, createTables };