import axios from "axios";

export default function handler(req, res) {
    axios.get(`https://discord.com/api/guilds/${req.query.guild}/channels`, {
        headers: {
            Authorization: `Bot ${process.env.DISCORD_BOT_TOKEN}`,
        }
    }).then((data) => {
        return res.status(200).json({channels: data.data});
    }).catch((e) => {
        console.error(e);
        return res.status(e.status || 500).end(e.message)
    });

}