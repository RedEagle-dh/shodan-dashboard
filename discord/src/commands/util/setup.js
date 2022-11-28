const {SlashCommandBuilder} = require("discord.js");
const pool = require("../../database/connection");
const {getResult} = require("../../database/dbFunctions");
const {createDatabase, createTables} = require("../../database/dbCreateTables");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("setup")
        .setDescription("Database Setup"),
    async execute(event) {
        const databaseList = await getResult("SHOW DATABASES");
        if (databaseList.find(o => o.Database === "shodan")) {
            event.reply({content: "Database already exists", ephemeral: true});
        } else {
            await createDatabase();
            await createTables();
            event.reply({content: "Database created", ephemeral: true});
        }
    }
}