const { getEventDmUnsubscribeEmbed } = require("../../embed/embedCreation");
const { deleteFrom } = require("../../database/dbFunctions");
module.exports = {
    name: 'guildScheduledEventUserRemove',
    async execute(event, user) {
        await user.send({embeds: [getEventDmUnsubscribeEmbed()]})
        // Subscriber wird aus der Datenbank gelöscht
        await deleteFrom(`UPDATE shodan.scheduledevents SET subscribers = JSON_REMOVE(subscribers, JSON_UNQUOTE(JSON_SEARCH(subscribers, 'one', '${user.id}'))) WHERE eventid = ${event.id}`)
    }
}