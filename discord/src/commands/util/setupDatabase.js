const { SlashCommandBuilder } = require("discord.js");
const { getResult } = require("../../database/dbFunctions");
const { createChannelDoc, createAnswersDoc, createOptInDoc, createEventDoc } = require("../../database/dbCreateTables");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("reset")
        .setDescription("Database reset")
        .setDMPermission(false),
    async execute(event, db, log) {
        if (db === null) log.error("Couldn't reset database!");
        try {
            await createChannelDoc(db);
            await createAnswersDoc(db);
            await createOptInDoc(db);
            await createEventDoc(db);
            await event.reply("Successfully reset database!");
        } catch (err) {
            log.error(`Error while resetting database: ${err}`);
            await event.reply("Error while resetting database.");
        }

    }
}