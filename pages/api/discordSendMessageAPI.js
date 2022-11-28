import axios from "axios";

export default function handler(req, res) {

    axios.post(`https://discord.com/api/channels/${req.body.channel}/messages`, {
        content: req.body.text
    }, {
        headers: {
            Authorization: `Bot MTAyMTg1NzEwNjA4MjY3MjcyMQ.GftBwA.7A4ghb4f4-9tTQTOPjJFVY9U32a4cx6z8zqhDI`,
        }
    }).then((data) => {
        res.status(200);
    }).catch((e) => {
        console.error(e);
        return res.status(e.status || 500).end(e.message)
    });
    res.status(200).json({name: 'John Doe'});
}