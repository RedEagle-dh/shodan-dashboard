const mysql = require("mysql");

const DATABASE = `${process.env.DB_DB}`;

const pool = mysql.createPool({
    host: `${process.env.DB_NAME}`,
    user: `${process.env.DB_USER}`,
    password: `${process.env.DB_PASSWORD}`,
    database: DATABASE
})


export default function patchChannel(req, res) {
    const query = `UPDATE ${DATABASE}.channelsetup SET channelid = ? WHERE functionname = ?`;
    pool.query(query, [req.body.channelId, req.body.feature],(err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({name: "John Doe"});
        }
    })
}