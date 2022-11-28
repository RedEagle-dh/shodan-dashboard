const {SlashCommandBuilder} = require("discord.js");
const {getResult, insert} = require("../../database/dbFunctions");
const {getNewId} = require("../../functions/idHandler");
const {getErrorEmbed, getSuccessEmbed} = require("../../embed/embedCreation");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("addgame")
        .setDescription("Add a game to a category for the opt-in feature")
        .addStringOption(option => option.setName("name").setDescription("The name of the game").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("The role to give").setRequired(true))
        .addStringOption(option => option.setName("category").setDescription("The category name/id to add the game to").setRequired(true))
        .addStringOption(option => option.setName("emoji").setDescription("The emoji to use for the game").setRequired(true))
        .addStringOption(option => option.setName("description").setDescription("The description of the game").setRequired(true)),

    async execute(event) {
        const emoji = event.options.getString("emoji");
        const name = event.options.getString("name");
        const role = event.options.getRole("role");
        const category = event.options.getString("category");
        const description = event.options.getString("description");

        const res = await getResult(`SELECT * FROM shodan.gamecategories WHERE name = '${category}'`);
        if (res.length === 0) {
            event.reply({embeds: [getErrorEmbed(`The game category (dropdown menu) with the name/id ${category} does not exist. Please create it first with /addcategory`)], ephemeral: true});
            return;
        }
        const oldMaxId = await getResult(`SELECT MAX(id) as id FROM shodan.games`);
        const newId = getNewId(oldMaxId);
        await insert(`INSERT INTO shodan.games (id, name, roleid, optinid, emoji, description) VALUES ('${newId}', '${name}', '${role.id}', '${res[0].id}', '${emoji}', '${description}')`);
        event.reply({embeds: [getSuccessEmbed(`Successfully added the data below to the category (dropdown menu) \`${category}\`\n\n**Name:** ${name}\n**Role:** ${role}\n**Emoji:** ${emoji}\n**Description:** ${description}`)]});
    }
}