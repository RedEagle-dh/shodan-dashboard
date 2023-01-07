const {SlashCommandBuilder} = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("talk")
        .setDescription("N"),

    async execute(event, db) {
        const replyMessages = JSON.parse(await db.get("answers")).talk;
        const msg = replyMessages[Math.floor(Math.random() * replyMessages.length)];
        event.reply(msg);
    }
}