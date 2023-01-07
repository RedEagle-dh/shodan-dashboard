const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("love")
        .setDescription("Confess your love to a user"),

    async execute(event, db) {
        const replyMessages = JSON.parse(await db.get("answers")).love;
        const msg = replyMessages[Math.floor(Math.random() * replyMessages.length)];
        event.reply(msg);
    }
}