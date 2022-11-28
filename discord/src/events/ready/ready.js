const {ActivityType} = require("discord-api-types/v10");
module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`Logged in as ${client.user.tag}!`);
        client.user.setActivity("Working on fixing Humanity", {type: ActivityType.Custom, name: "Working"});
    }
}