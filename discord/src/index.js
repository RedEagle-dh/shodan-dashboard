require('dotenv').config({path: ".env"});

const { getDatabase } = require("./database/connection");
const { Logger } = require("../Log/log");
const { exit } = require('process');
const { redisAlive, variablesAlive } = require("../Log/isAlive");
const { Client, Collection, EmbedBuilder, ActionRowBuilder, Partials} = require("discord.js");

const db = new getDatabase();
const log = new Logger();
const client = new Client({ intents: ["Guilds", "GuildMessages", "MessageContent", "GuildVoiceStates", "GuildMembers", "GuildPresences", "GuildScheduledEvents"],
    partials: [Partials.GuildScheduledEvent] })
const fs = require("fs");

const deploy = require("./deployCommands");

redisAlive(db, log);
variablesAlive(process, log);
deploy.data.deploycmd(log);



async function main() {
    try {
        log.info("Started loading events...");
        const eventDirectories = fs.readdirSync(__dirname + "/events");
        for (const directory of eventDirectories) {
            const eventFiles = fs.readdirSync(__dirname + `/events/${directory}`).filter(file => file.endsWith('.js'));
            for (const file of eventFiles) {
                const event = require(__dirname + `/events/${directory}/${file}`);
                if (event.once) {
                    client.once(event.name, (...args) => event.execute(...[...args, ...[db, log, client]]));
                } else {
                    client.on(event.name, (...args) => event.execute(...[...args, ...[db, log, client]]));
                }
            }
        }
        log.success("Events loaded!")
    } catch (err) {
        log.fatal(err);
        exit(1);
    }



    try {
        log.info("Started loading commands...");
        client.commands = new Collection();
        const directories = fs.readdirSync(__dirname + "/commands");
        for (const directory of directories) {
            const commandFiles = fs.readdirSync(__dirname + `/commands/${directory}`).filter(file => file.endsWith(".js"));
            for (const file of commandFiles) {
                const command = require(__dirname + `/commands/${directory}/${file}`);
                client.commands.set(command.data.name, command);
            }
        }
        log.success("Commands loaded!");
    } catch (err) {
        log.fatal(err);
        exit(1);
    }
}


main();


process.on("unhandledRejection", (err) => {
    log.error(err);
})


client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
    log.success("Token parsed successfully in " + __filename.split("\\").reverse()[0]);
}).catch(() => {
    log.fatal("Token is invalid.");
    exit(1);
})

