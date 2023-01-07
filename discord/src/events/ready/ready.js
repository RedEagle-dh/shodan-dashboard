const {ActivityType} = require("discord-api-types/v10");
const activity = [{name: "Working on fixing humanity", type: ActivityType.Playing}];
module.exports = {
    name: "ready",
    once: true,
    async execute(client, db, __LOG) {
        __LOG.info(`Logged in as ${client.user.tag} on ${client.guilds.cache.size} Servers: ${client.guilds.cache.map(g => g.name).join(", ")}`);
        client.user.setPresence(
            {
                activities: activity,
            }
        )
        __LOG.trace(`Activity of ${client.user.tag} is "${getActivityType(activity[0].type)} ${activity[0].name}" `)
    }
}

function getActivityType(type) {
    switch (type) {
        case 0: {
            return "Playing";
        }
        case 1: {
            return "Streaming";
        }
        case 2: {
            return "Listening";
        }
        case 3: {
            return "Watching";
        }
        case 4: {
            return "Custom";
        }
        case 5: {
            return "Competing";
        }
    }
}