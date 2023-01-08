const {sendSubscriberDm} = require("../../functions/scheduledEventFunctions");
const {getEventDmDelEmbed} = require("../../embed/embedCreation");
const {deleteFrom} = require("../../database/dbFunctions");
module.exports = {
    name: 'guildScheduledEventDelete',
    async execute(event, client) {
        //await sendSubscriberDm(event, client, getEventDmDelEmbed());
        //await deleteFrom(`DELETE FROM shodan.scheduledevents WHERE eventid = ${event.id}`);
    }
}