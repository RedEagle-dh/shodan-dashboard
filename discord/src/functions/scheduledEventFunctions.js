const {getResult, insert} = require("../database/dbFunctions");
const {SelectMenuBuilder, SelectMenuOptionBuilder} = require("discord.js");
const {getEventDmDelEmbed} = require("../embed/embedCreation");

async function sendSubscriberDm(event, client, embed) {
    const subs = await getResult(`SELECT subscribers FROM shodan.scheduledevents WHERE eventid = ${event.id}`)
    if (subs[0].subscribers.length !== 0) {
        const subscribers = subs[0].subscribers.users;
        for (const sub of subscribers) {
            const user = client.users.cache.find(u => u.id === sub);
            await user.send({embeds: [embed]})
        }
    }
}

module.exports = { sendSubscriberDm };