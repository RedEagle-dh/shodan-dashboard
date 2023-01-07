const {SlashCommandBuilder} = require("discord.js");
const { getDocument, setDocument } = require("../../functions/optinfunctions");
const {getSuccessEmbed, getErrorEmbed} = require("../../embed/embedCreation");
const msg = require("../../messages.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("removecategory")
        .setDescription("Deletes a category (dropdown menu) from the opt-in feature")
        .addStringOption(option => option.setName("categoryname").setDescription("The category you want to delete").setRequired(true)),

    async execute(event, db, log) {
        const category = event.options.getString("categoryname").toLowerCase();
        const doc = await getDocument(db, "optin");
        const back = delete doc[category.toLowerCase()];
        const b = await setDocument(db, doc, "optin");
        if (back && b === "OK") {
            event.reply({embeds: [getSuccessEmbed(msg.successRemoveCategory).setTimestamp().setFooter({text: `Category ID: ${category}`})]});
        } else {
            event.reply({embeds: [getSuccessEmbed(msg.errorDeleteCategory).setTimestamp().setFooter({text: `Category ID: ${category}`})]});
        }
    }
}