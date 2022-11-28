const {getEventDmEmbed} = require("../../embed/embedCreation");
const {insert} = require("../../database/dbFunctions");
module.exports = {
    name: 'guildScheduledEventUserAdd',
    async execute(event, user) {
        await user.send({embeds: [getEventDmEmbed()]})
        // Subscriber wird in der Datenbank gespeichert
        await insert(`UPDATE shodan.scheduledevents SET subscribers = JSON_ARRAY_APPEND(subscribers, '$.users', '${user.id}') WHERE eventid = ${event.id}`)
    }
}