const {SlashCommandBuilder} = require("discord.js");
const {deleteFrom} = require("../../database/dbFunctions");
const {getSuccessEmbed, getErrorEmbed} = require("../../embed/embedCreation");
const msg = require("../../messages.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("removecategory")
        .setDescription("Deletes a category (dropdown menu) from the opt-in feature")
        .addStringOption(option => option.setName("categoryname").setDescription("The category you want to delete").setRequired(true)),

    async execute(event) {
        const category = event.options.getString("categoryname");
        const result = await deleteFrom(`DELETE FROM shodan.gamecategories WHERE name = '${category}'`);
        let embed;
        if (result.affectedRows === 0) {
            embed = getErrorEmbed(msg.errorDeleteCategory);
        } else {
            embed = getSuccessEmbed(msg.successRemoveCategory);
        }
        event.reply({embeds: [embed.setTimestamp().setFooter({text: `Category ID: ${category}`})]});
    }
}