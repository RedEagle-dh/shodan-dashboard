const {SlashCommandBuilder} = require("discord.js");
const {insert, getResult} = require("../../database/dbFunctions");
const {getSuccessEmbed} = require("../../embed/embedCreation");
const msg = require("../../messages.json");
const {getNewId} = require("../../functions/idHandler");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("addcategory")
        .setDescription("Adding a new drop down menu to the opt-in feature")
        .addStringOption(option => option.setName("name").setDescription("The id/name for the dropdown menu (needed for deletion and adding games)").setRequired(true)),

    async execute(event) {
        const name = event.options.getString("name");
        const oldId = await getResult(`SELECT MAX(id) as id FROM shodan.gamecategories`);
        const newId = await getNewId(oldId);

        await insert(`INSERT INTO shodan.gamecategories (id, name) VALUES ('${newId}', '${name}')`);
        event.reply({embeds: [getSuccessEmbed(msg.successAddCategory).setTimestamp().setFooter({text: `Category ID: ${name}`})]});
    }
}