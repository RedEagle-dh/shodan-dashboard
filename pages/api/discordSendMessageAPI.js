import axios from "axios";

export default function handler(req, res) {

    axios.post(`https://discord.com/api/channels/${req.body.channel}/messages`, {
        content: req.body.text
    }, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        }
    }).then((data) => {
        res.status(200);
    }).catch((e) => {
        console.error(e);
        return res.status(e.status || 500).end(e.message)
    });
    res.status(200).json({name: 'John Doe'});
}