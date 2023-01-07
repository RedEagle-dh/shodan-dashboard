const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("say")
        .setDescription("Say something")
        .addStringOption(option => option.setName("message").setDescription("The message to say").setRequired(true)),

    async execute(event) {
        const msg = event.options.getString("message");
        event.reply({content: "Message sent!", ephemeral: true});
        await event.channel.send(msg);
    }
}