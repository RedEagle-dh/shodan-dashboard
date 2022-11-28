const {botDevCommands, adminCommands, modCommands, memberCommands, botFunctions} = require("./helpEmbeds");

async function route(endpoint, event) {
    switch (endpoint) {
        case "botdev": {
            event.update({embeds:[botDevCommands()]});
            break;
        }
        case "admin": {
            event.update({embeds:[await adminCommands()]});
            break;
        }
        case "moderation": {
            event.update({embeds:[modCommands()]});
            break;
        }
        case "general": {
            event.update({embeds:[await memberCommands()]});
            break;
        }
        case "functions": {
            event.update({embeds:[botFunctions()]});
            break;
        }
    }
}

module.exports = {route};