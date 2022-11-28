const {SlashCommandBuilder} = require("discord.js");
const replyMessages = require("./replies.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("talk")
        .setDescription("N"),

    async execute(event) {
        const msg = replyMessages.talk[Math.floor(Math.random() * replyMessages.talk.length)];
        event.reply(msg);
    }
}