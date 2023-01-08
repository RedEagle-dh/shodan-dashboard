const {getResult, insert} = require("../../database/dbFunctions");
const {getNewId} = require("../../functions/idHandler");
const { objectIsEmpty } = require("../../functions/outSourcedFunctions");
module.exports = {
    name: 'guildScheduledEventCreate',
    async execute(event, db, log, client) {
        const channelid = JSON.parse(await db.get(`channels`)).eventAnnouncementTextchannel;
        console.log(event);
        if (channelid.length !== null) {
            const url = event.url;
            const channel = await event.client.channels.cache.find(c => c.id === channelid);
            console.log(channelid);
            console.log(channel);

            channel.send({content: `The event **${event.name}** has been created by **${event.creator.tag}** and it is scheduled to start <t:${Math.floor(Number(event.scheduledStartTimestamp) / 1000)}>! You can join it here: ${url}`});
        }
        
        const eventDocument = JSON.parse(await db.get(`events`));
    
        eventDocument[event.id] = event;
        await db.set(`events`, JSON.stringify(eventDocument));
    }
}