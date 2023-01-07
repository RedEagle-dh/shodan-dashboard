const {SlashCommandBuilder} = require("discord.js");
const {getSuccessEmbed, getErrorEmbed} = require("../../embed/embedCreation");
const msg = require("../../messages.json");
const {getDocument, setDocument} = require("../../functions/optinfunctions");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("addcategory")
        .setDescription("Adding a new drop down menu to the opt-in feature")
        .addStringOption(option => option.setName("name").setDescription("The id/name for the dropdown menu (needed for deletion and adding games)").setRequired(true)),

    async execute(event, db, log) {
        const name = event.options.getString("name");
        const doc = await getDocument(db, "optin");
        if (doc[name.toLowerCase()]) {
            log.error(`Couldn't create new optin category \`${name}\` because it already exists.`);
            event.reply({embeds: [getErrorEmbed(msg.error).setTimestamp().setFooter({text: `Category ID: ${name}`})]});
            return;
        }
        doc[name.toLowerCase()] = {
            name: name,
            selections: []
        }
        const back = await setDocument(db, doc, "optin");
        if (back === "OK") {
            event.reply({embeds: [getSuccessEmbed(msg.successAddCategory).setTimestamp().setFooter({text: `Category ID: ${name}`})]});
        } else {
            event.reply({embeds: [getErrorEmbed(msg.error).setTimestamp().setFooter({text: `Category ID: ${name}`})]});
        }
    }
}