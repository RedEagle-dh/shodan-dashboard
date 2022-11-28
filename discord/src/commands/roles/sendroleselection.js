const {SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ActionRow} = require("discord.js");
const {getOptInEmbed} = require("../../embed/embedCreation");
const {getDropDownMenus} = require("../../functions/optinfunctions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendoptin")
        .setDescription("Sending the message for the opt-in feature"),

    async execute(event) {
        const menus = await getDropDownMenus();
        const rows = [];
        for (const menu of menus) {
            rows.push(new ActionRowBuilder().addComponents(menu));
        }
        await event.reply({content: "Message sent!", ephemeral: true});
        await event.channel.send({embeds: [getOptInEmbed()], components: [...rows]}).catch(async (err) => {
            console.log(err);
            await event.editReply({content: `Something went wrong. Please check if every category has at least one game item!\n\n📄 **Error Log**\`\`\`js\n${err.message}\`\`\``, ephemeral: true});
        });
    }
}