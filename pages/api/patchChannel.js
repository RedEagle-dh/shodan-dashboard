const mysql = require("mysql");

const pool = mysql.createPool({
    host: "localhost",
    user: 'root',
    password: 'RedEagle#0400farkas@1971mysql',
    database: 'shodan'
})


export default function patchChannel(req, res) {
    const query = "UPDATE shodan.channelsetup SET channelid = ? WHERE functionname = ?";
    pool.query(query, [req.body.channelId, req.body.feature],(err, result, fields) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({name: "John Doe"});
        }
    })
}