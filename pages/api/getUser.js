const mysql = require("mysql");
const DATABASE = `${process.env.DB_DB}`;

const pool = mysql.createPool({
    host: `${process.env.DB_NAME}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: DATABASE
})


export default function getUsers(req, res) {
    const user_query = `SELECT * FROM ${DATABASE}.user`;
    pool.query(user_query, (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.status(200).json({users: result[0]});
        }
    })
}