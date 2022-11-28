const {SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
require('dotenv').config({path: "../../.env"});
module.exports = {
    data: new SlashCommandBuilder()
        .setName("restart")
        .setDescription("Restart the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(event) {
        event.reply({content: "Restarting...", ephemeral: true}).then(() => {
            event.client.destroy();
            console.log(`Bot is restarting. Requested by user ${event.user.tag} with ID ${event.user.id}`);
        }).then(() => {
            event.client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
                console.log(`Bot restarted successfully.`);
                event.editReply("Restarted!");
            }).catch(() => {
                event.editReply("Error restarting bot. Please try again later.");
            });
        }).catch(() => {
            event.editReply("Error restarting bot. Please try again later.");
        });

    }
}