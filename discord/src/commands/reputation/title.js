const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("title")
        .setDescription("Ask for a title"),

    async execute(event) {
        // TODO
        /* 1. Grants user the “Greedy” title
        2. Bot replies with the message “Human, you should learn to be careful what you ask for. I am not a merciful goddess.” */
    }
}