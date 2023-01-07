const {SlashCommandBuilder} = require("discord.js");
const {PermissionFlagsBits} = require("discord-api-types/v10");
const { exit } = require("process");
require('dotenv').config({path: "../../.env"});
module.exports = {
    data: new SlashCommandBuilder()
        .setName("restart")
        .setDescription("Restart the bot")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(event, db, log) {
        event.reply({content: "Restarting...", ephemeral: true}).then(() => {
            event.client.destroy();
            log.warn(`Bot is restarting. Requested by user ${event.user.tag} with ID ${event.user.id}`);
        }).then(() => {
            event.client.login(process.env.DISCORD_BOT_TOKEN).then(() => {
                log.success(`Bot restarted successfully.`);
                event.editReply("Restarted!");
            }).catch(() => {
                event.editReply("Error restarting bot. Please try again later.");
                log.fatal(`Failure while restarting bot.`);
                exit();
            });
        }).catch(() => {
            event.editReply("Error restarting bot. Please try again later.");
            log.fatal(`Failure while restarting bot.`);
            exit();
        });

    }
}