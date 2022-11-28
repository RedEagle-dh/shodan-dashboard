const pool = require("./connection");

function getResult(statement) {
    return new Promise((resolve, reject) => {
        pool.execute(statement, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function insert(statement) {
    return new Promise((resolve, reject) => {
        pool.execute(statement, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

function deleteFrom(statement) {
    return new Promise((resolve, reject) => {
        pool.execute(statement, (err, result) => {
            if (err) reject(err);
            resolve(result);
        })
    })
}

module.exports = {
    getResult,
    insert,
    deleteFrom
}