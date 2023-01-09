const { ModalBuilder, TextInputStyle, SlashCommandBuilder, TextInputBuilder, ActionRowBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName("reportbug")
        .setDescription("Report bugs here if you found one"),
    async execute(event, db, log, client) {
        const modal = new ModalBuilder()
            .setCustomId('bugreport')
            .setTitle(`Report a bug`);


        const title = new ActionRowBuilder().addComponents(new TextInputBuilder()
            .setCustomId(`bugtitle`)
            .setLabel(`Title`)
            .setPlaceholder(`A short but significant name for the bug`)
            .setStyle(TextInputStyle.Short)
            .setMinLength(3)
            .setRequired(true));

        const prio = new ActionRowBuilder().addComponents(new TextInputBuilder()
            .setCustomId(`bugprio`)
            .setLabel(`Priority`)
            .setPlaceholder(`High, Middle or Low Priority`)
            .setStyle(TextInputStyle.Short)
            .setRequired(true));

        const description = new ActionRowBuilder().addComponents(new TextInputBuilder()
            .setCustomId(`bugdescription`)
            .setLabel(`Description`)
            .setPlaceholder(`A detailed explanation of the bug with description how to reproduce it (Screenshots as link).`)
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true));

        modal.addComponents(title, prio, description);
        await event.showModal(modal);
    }
}