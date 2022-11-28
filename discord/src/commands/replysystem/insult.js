const {SlashCommandBuilder} = require("discord.js");
const replyMessages = require("./replies.json");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("insult")
        .setDescription("N")
        .addUserOption(option => option.setName("user").setDescription("N").setRequired(true)),

    async execute(event) {
        const user = event.options.getUser("user");
        const msg = replyMessages.insult[Math.floor(Math.random() * replyMessages.insult.length)].replace("${username}", `${user}`);

        event.reply(msg);
    }
}