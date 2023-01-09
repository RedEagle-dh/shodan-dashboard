const { SlashCommandBuilder } = require("discord.js");
const { getErrorEmbed, getSuccessEmbed } = require("../../embed/embedCreation");
const { getDocument, setDocument } = require("../../functions/optinfunctions");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("addgame")
        .setDescription("Add a game to a category for the opt-in feature")
        .addStringOption(option => option.setName("name").setDescription("The name of the game").setRequired(true))
        .addRoleOption(option => option.setName("role").setDescription("The role to give").setRequired(true))
        .addStringOption(option => option.setName("category").setDescription("The category name/id to add the game to").setRequired(true))
        .addStringOption(option => option.setName("emoji").setDescription("The emoji to use for the game").setRequired(true))
        .addStringOption(option => option.setName("description").setDescription("The description of the game").setRequired(true))
        .setDMPermission(false),

    async execute(event, db, log) {
        const emoji = event.options.getString("emoji");
        const name = event.options.getString("name");
        const role = event.options.getRole("role");
        const category = event.options.getString("category").toLowerCase();
        const description = event.options.getString("description");

        const doc = await getDocument(db, "optin");
        if (doc[category]) {
            if (doc[category].selections.find(obj => obj.name.toLowerCase() === name.toLowerCase())) {
                event.reply({ embeds: [getErrorEmbed(`The game with the name/id ${name} exists already. Please choose another name!`)], ephemeral: true });
            } else {
                doc[category].selections.push({
                    emoji: emoji,
                    name: name,
                    description: description,
                    category: category,
                    role: role.id
                })
                const back = await setDocument(db, doc, "optin");
                if (back === "OK") {
                    event.reply({ embeds: [getSuccessEmbed(`Successfully added the data below to the category (dropdown menu) \`${category}\`\n\n**Name:** ${name}\n**Role:** ${role}\n**Emoji:** ${emoji}\n**Description:** ${description}`)] });
                } else {
                    event.reply({ embeds: [getErrorEmbed("There was an error adding the data")] });
                    log.error("Couldn't add the game to the category.")
                }
            }
        } else {
            event.reply({ embeds: [getErrorEmbed(`The game category (dropdown menu) with the name/id ${category} does not exist. Please create it first with /addcategory`)], ephemeral: true });
        }
    }
}