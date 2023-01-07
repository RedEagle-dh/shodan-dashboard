const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("rep")
        .setDescription("Let me tell you how high your reputation is."),

    async execute(event) {
        // TODO
        // Users should also be able to run the “/rep” command and have the bot tell them what their rep is. This would be tracked in the SQL database.


        // The whole text should be tracked in the database? For what and how do you want to get this information back?
    }
}