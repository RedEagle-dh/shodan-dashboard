const {getResult, insert} = require("../../database/dbFunctions");
const {getNewId} = require("../../functions/idHandler");
module.exports = {
    name: 'guildScheduledEventCreate',
    async execute(event) {
        const channelid = await getResult(`SELECT channelid FROM shodan.channelsetup WHERE functionname = 'eventAnnouncement'`);
        if (channelid.length !== 0) {
            const url = event.url;
            const channel = await event.client.channels.cache.find(c => c.id === channelid[0].channelid);
            channel.send({content: `The event **${event.name}** has been created by **${event.creator.tag}** and it is scheduled to start <t:${Math.floor(Number(event.scheduledStartTimestamp) / 1000)}>! You can join it here: ${url}`});
        }
        const oldId = await getResult(`SELECT MAX(id) as id FROM shodan.scheduledevents`);
        await insert(`INSERT INTO shodan.scheduledevents (id, eventid, event, subscribers) VALUES (${getNewId(oldId)}, ${event.id}, '${JSON.stringify(event)}', '{"users": []}')`);
    }
}