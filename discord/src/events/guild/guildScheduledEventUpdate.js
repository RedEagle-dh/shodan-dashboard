const {getResult, insert} = require("../../database/dbFunctions");
const {getNewId} = require("../../functions/idHandler");
const {sendSubscriberDm} = require("../../functions/scheduledEventFunctions");
const {getEventDmUpdateEmbed} = require("../../embed/embedCreation");
module.exports = {
    name: 'guildScheduledEventUpdate',
    async execute(oldEvent, newEvent, client) {
        // Event Announcement Kanal, falls nicht vorhanden, wird das Event nicht angekündigt
        /* const channelid = await getResult(`SELECT channelid FROM shodan.channelsetup WHERE functionname = 'eventAnnouncement'`);
        if (channelid.length !== 0) {
            const url = newEvent.url;
            const channel = await client.channels.cache.find(c => c.id === channelid[0].channelid);
            channel.send({content: `The event **${newEvent.name}** has been updated by **${newEvent.creator.tag}** and it is scheduled to start <t:${Math.floor(Number(newEvent.scheduledStartTimestamp) / 1000)}>! You can join it here: ${url}`});
            await sendSubscriberDm(newEvent, client, getEventDmUpdateEmbed());
        }
        // Falls das alte Event die gleiche ID hat wie das neue
        if (oldEvent.id === newEvent.id) {
            // Falls altes Event in der Datenbank vorhanden ist, wird es überschrieben. Wenn nicht, wird ein neuer Eintrag gemacht.
            const res = await getResult(`SELECT * FROM shodan.scheduledevents WHERE eventid = '${newEvent.id}'`)
            if (res.length > 0) {
                console.log(res[0].subscribers)
                await getResult(`UPDATE shodan.scheduledevents SET event = '${JSON.stringify(newEvent)}', subscribers = '${JSON.stringify(res[0].subscribers)}' WHERE eventid = '${oldEvent.id}'`);
            } else {
                console.log("Y")
                const oldId = await getResult(`SELECT MAX(id) as id FROM shodan.scheduledevents`);
                await insert(`INSERT INTO shodan.scheduledevents (id, eventid, event, subscribers) VALUES (${getNewId(oldId)}, '${newEvent.id}', '${JSON.stringify(newEvent)}', '{"users": []}')`);
            }

        } */
    }
}