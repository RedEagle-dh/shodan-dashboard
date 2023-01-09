const {SlashCommandBuilder, ActionRowBuilder, SelectMenuBuilder, ActionRow} = require("discord.js");
const {getOptInEmbed} = require("../../embed/embedCreation");
const {getDropDownMenus} = require("../../functions/optinfunctions");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("sendoptin")
        .setDescription("Sending the message for the opt-in feature")
        .setDMPermission(false),

    async execute(event, db, log) {
        const menus = await getDropDownMenus(db);
        const rows = [];
        for (const menu of menus) {
            rows.push(new ActionRowBuilder().addComponents(menu));
        }
        await event.reply({content: "<:checkmark:1043717749786030100> Message sent!", ephemeral: true});
        await event.channel.send({embeds: [getOptInEmbed()], components: [...rows]}).catch(async (err) => {
            log.error(err.stack || err);
            await event.editReply({content: `Something went wrong. Please check if every category has at least one game item!\n\n📄 **Error Log**\`\`\`js\n${err}\`\`\``, ephemeral: true});
        });
    }
}