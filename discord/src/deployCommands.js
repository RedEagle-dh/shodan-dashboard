require('dotenv').config({path: ".env"});


const { REST } =  require("@discordjs/rest");
const { Routes } = require("discord-api-types/v10");
const { exit } = require('process');

const fs = require("fs");
const rest = new REST({version: '10'}).setToken(process.env.DISCORD_BOT_TOKEN)
const methods = {};

    
    

methods.deploycmd = async function run(log) {
    const commands = [];

    const directories = fs.readdirSync(__dirname + "/commands");
    for (const directory of directories) {
        const commandFiles = fs.readdirSync(__dirname + `/commands/${directory}`).filter(file => file.endsWith(".js"));
        for (const file of commandFiles) {
            const command = require(__dirname + `/commands/${directory}/${file}`);
            commands.push(command.data.toJSON());
        }
    }

    try {
        log.warn(`Started refreshing ${commands.length} application (/) commands.`);
        await rest.put(Routes.applicationCommands(process.env.APPLICATION_ID), {
            body: commands,
        });
        log.info(`${commands.length} application (/) commands loaded successfully.`);
    } catch (err) {
        log.error("Failed to parse token in " + __filename.split("\\").reverse()[0]);
        exit();
    }
}

exports.data = methods;

