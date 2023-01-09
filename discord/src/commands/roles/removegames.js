const {SlashCommandBuilder} = require("discord.js");
const {getErrorEmbed, getSuccessEmbed} = require("../../embed/embedCreation");
const msg = require("../../messages.json");
const { getDocument, setDocument } = require("../../functions/optinfunctions");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("removegame")
        .setDescription("Deletes an item from a specific category (dropdown menu) from the opt-in feature")
        .addStringOption(option => option.setName("gamename").setDescription("The game you want to delete").setRequired(true))
        .addStringOption(option => option.setName("categoryname").setDescription("The category you want to delete the game from").setRequired(true))
        .setDMPermission(false),

    async execute(event, db, log) {
        const game = event.options.getString("gamename");
        const category = event.options.getString("categoryname");
        
        const doc = await getDocument(db, "optin");
        const obj = doc[category.toLowerCase()].selections.find(x => x.name.toLowerCase() === game.toLowerCase());
        const index = doc[category.toLowerCase()].selections.indexOf(obj);
        
        if (index === -1) {
            event.reply({embeds: [getErrorEmbed(msg.errorDeleteGame).setTimestamp().setFooter({text: `Game ID: ${game} | Category ID: ${category}`})]});
            return;
        }
        doc[category.toLowerCase()].selections.splice(doc[category.toLowerCase()].selections.indexOf(obj), 1)
        const back = await setDocument(db, doc, "optin");
        if (back === "OK") {
            event.reply({embeds: [getSuccessEmbed(msg.successRemoveGame).setTimestamp().setFooter({text: `Game ID: ${game} | Category ID: ${category}`})]});
        } else {
            event.reply({embeds: [getErrorEmbed(msg.errorDeleteGame).setTimestamp().setFooter({text: `Game ID: ${game} | Category ID: ${category}`})]});
            log.error("Couldn't delete game from optin.")
        }        
    }
}