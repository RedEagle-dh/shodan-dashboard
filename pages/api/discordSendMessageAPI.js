import axios from "axios";

export default async function handler(content, res) {
    try{
        const data = await axios.post("https://discord.com/api/channels/758700920375607306/messages", {
                content: content
        }, {
            headers: {
                Authorization: `Bot MTAwMjI1MTQ1NzM5MjgyMDI0NA.GxuhfO.mZ93gh9u1R1e-A2BtS_1BwZAoOgpNEjf-N3jLs`,
            }
        });
        res.status(200).json(data);
    } catch(e){
        console.error(e);
        return res.status(e.status || 500).end(e.message)
    }
}