const {SlashCommandBuilder} = require("discord.js");
const {deleteFrom, getResult} = require("../../database/dbFunctions");
const {getErrorEmbed, getSuccessEmbed} = require("../../embed/embedCreation");
const msg = require("../../messages.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("removegame")
        .setDescription("Deletes an item from a specific category (dropdown menu) from the opt-in feature")
        .addStringOption(option => option.setName("gamename").setDescription("The game you want to delete").setRequired(true))
        .addStringOption(option => option.setName("categoryname").setDescription("The category you want to delete the game from").setRequired(true)),

    async execute(event) {
        const game = event.options.getString("gamename");
        const category = event.options.getString("categoryname");
        const result = await deleteFrom(`DELETE shodan.games FROM shodan.games INNER JOIN shodan.gamecategories ON shodan.gamecategories.id = shodan.games.optinid WHERE shodan.games.name = '${game}' AND shodan.gamecategories.name = '${category}'`);
        let embed;
        if (result.affectedRows === 0) {
            embed = getErrorEmbed(msg.errorDeleteGame);
        } else {
            embed = getSuccessEmbed(msg.successRemoveGame);
        }
        event.reply({embeds: [embed.setTimestamp().setFooter({text: `Game ID: ${game} | Category ID: ${category}`})]});
    }
}