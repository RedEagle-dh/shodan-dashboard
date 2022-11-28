const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'RedEagle#0400farkas@1971mysql',
    database: 'shodan'
})


export default function getUsers(req, res) {
    const user_query = "SELECT * FROM shodan.user";
    pool.query(user_query, (err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            console.log(result);
            res.status(200).json({users: result[0]});
        }
    })
}