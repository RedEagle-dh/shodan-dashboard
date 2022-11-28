import axios from "axios";

export default function handler(req, res) {
    axios.get(`https://discord.com/api/guilds/${req.query.guild}/channels`, {
        headers: {
            Authorization: `Bot MTAyMTg1NzEwNjA4MjY3MjcyMQ.GftBwA.7A4ghb4f4-9tTQTOPjJFVY9U32a4cx6z8zqhDI`,
        }
    }).then((data) => {
        return res.status(200).json({channels: data.data});
    }).catch((e) => {
        console.error(e);
        return res.status(e.status || 500).end(e.message)
    });

}