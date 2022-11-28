
require('dotenv').config({path: ".env"});
const { log } = require('console');
const { Client, Collection, EmbedBuilder, ActionRowBuilder, Partials} = require("discord.js");
const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates", "GuildMembers", "GuildPresences", "GuildScheduledEvents"],
    partials: [Partials.GuildScheduledEvent] })
const fs = require("fs");
const deploy = require("./deploycommands");
console.log(__dirname);
console.log(process.env.DB_USER);
deploy.data.deploycmd();


const eventDirectories = fs.readdirSync(__dirname + "/events");
for (const directory of eventDirectories) {
    const eventFiles = fs.readdirSync(__dirname + `/events/${directory}`).filter(file => file.endsWith('.js'));
    for (const file of eventFiles) {
        const event = require(__dirname + `/events/${directory}/${file}`);
        if (event.once) {
            client.once(event.name, (...args) => event.execute(...args, client));
        } else {
            client.on(event.name, (...args) => event.execute(...args, client));
        }
    }
}

async function main() {

    client.commands = new Collection();
    const directories = fs.readdirSync(__dirname + "/commands");
    for (const directory of directories) {
        const commandFiles = fs.readdirSync(__dirname + `/commands/${directory}`).filter(file => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(__dirname + `/commands/${directory}/${file}`);
            client.commands.set(command.data.name, command);
        }
    }
}


main();


process.on("unhandledRejection", (err) => {
    console.log("Error:", err)
})


client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
    console.log("Bot is online!")
})