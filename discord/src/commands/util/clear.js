const {SlashCommandBuilder} = require("discord.js");
const {splitInputDate} = require("../../functions/sideFunctions");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription("Clearing a bunch of messages")
        .addStringOption(option => option.setName("keyword").setDescription("The contained keyword in the messages").setRequired(true))
        .addUserOption(option => option.setName("user").setDescription("The user who sent the messages").setRequired(true))
        .addStringOption(option => option.setName("time").setDescription("The time when the oldest message to be deleted was written (max. 14d)").setRequired(true))
        .setDMPermission(false),

    async execute(event) {
        const user = event.options.getUser("user");
        const keyword = event.options.getString("keyword");
        const time = event.options.getString("time");
        const backTimeArray = splitInputDate(time);
        if (backTimeArray[0] > 14 && backTimeArray[1] === "d" || backTimeArray[0] > 336 && backTimeArray[1] === "h" || backTimeArray[0] > 20160 && backTimeArray[1] === "m") {
            event.reply("The time must be less than 14 days!");
            return;
        } else if (backTimeArray[1] !== "d" && backTimeArray[1] !== "h" && backTimeArray[1] !== "m") {
            event.reply("The time must be in the format of d/h/m!");
            return;
        }
        const channel = event.channel;
        const messages = await channel.messages.fetch();
        let messagesToDelete;
        switch (backTimeArray[1]) {
            case "d": {
                messagesToDelete = messages.filter(message => message.author.id === user.id && message.content.includes(keyword) && message.createdAt > Date.now() - (backTimeArray[0] * 86400 * 1000));
                await channel.bulkDelete(messagesToDelete);
                break;
            }
            case "h": {
                messagesToDelete = messages.filter(message => message.author.id === user.id && message.content.includes(keyword) && message.createdAt > Date.now() - (backTimeArray[0] * 3600 * 1000));
                await channel.bulkDelete(messagesToDelete);
                break;
            }
            case "m": {
                messagesToDelete = messages.filter(message => message.author.id === user.id && message.content.includes(keyword) && message.createdAt > Date.now() - (backTimeArray[0] * 60 * 1000));
                await channel.bulkDelete(messagesToDelete);
                break;
            }
        }
        event.reply({content: `Deleted ${messagesToDelete.size} messages from ${user} with the keyword \`${keyword}\`!`, ephemeral: true});
    }
}