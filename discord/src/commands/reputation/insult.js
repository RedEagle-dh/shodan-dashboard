const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("insult")
        .setDescription("Insult a user")
        .addUserOption(option => option.setName("user").setDescription("N").setRequired(true))
        .setDMPermission(false),

    async execute(event, db) {
        const replyMessages = JSON.parse(await db.get("answers")).insult;
        const user = event.options.getUser("user");
        if (user.id === "1021857106082672721") {
            event.reply("Hah! You can't insult me! I'm not a dumb human...");
            return;
        }
        const msg = replyMessages[Math.floor(Math.random() * replyMessages.length)].replace("${username}", `${user}`);

        event.reply(msg);
    }
}