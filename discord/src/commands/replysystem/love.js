const {SlashCommandBuilder} = require("discord.js");
const replyMessages = require("./replies.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("love")
        .setDescription("N"),

    async execute(event) {
        const msg = replyMessages.love[Math.floor(Math.random() * replyMessages.love.length)];
        event.reply(msg);
    }
}