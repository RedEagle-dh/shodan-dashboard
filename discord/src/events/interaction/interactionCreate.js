const {EmbedBuilder} = require("discord.js");

const msg = require("../../messages.json");
const {InteractionType} = require("discord-api-types/v10");
const {getSuccessEmbed, getRolesUpdatedEmbed} = require("../../embed/embedCreation");
const {getResult} = require("../../database/dbFunctions");
const {route} = require("../../functions/help/helpRouter");
module.exports = {
    name: "interactionCreate",
    async execute(event, db, log, client) {
        switch (event.type) {
            case InteractionType.ApplicationCommand: {
                break;
            }
            case InteractionType.MessageComponent: {
                if (event.isButton()) {

                } else if (event.isSelectMenu()) {
                    const dropDownMenus = await getResult(`SELECT * FROM shodan.gamecategories`);
                        if (event.customId === "help") {
                            await route(event.values[0], event);
                        } else if (dropDownMenus.some(menu => menu.name === event.customId)) {
                            const values = event.values;
                            const member = event.member;
                            const removed = [];
                            const added = [];
                            for (const value of values) {
                                if (member.roles.cache.some(role => role.id === value)) {
                                    await member.roles.remove(value);
                                    removed.push(`- <@&${value}>`);
                                } else {
                                    await member.roles.add(value);
                                    added.push(`- <@&${value}>`);
                                }
                            }
                            event.reply({embeds: [getRolesUpdatedEmbed(added, removed)], ephemeral: true});
                        }
                }
                break;
            }
        }
        if (event.type === InteractionType.ApplicationCommand) {
            const command = event.client.commands.get(event.commandName);
            if (!command) return;
            try {
                log.info(`[${event.guild.name}] ${event.user.tag} used /${event.commandName}`)
                await command.execute(event, db, log, client);
             } catch (error) {
                log.error(error.stack || error);
                event.reply({
                    embeds: [new EmbedBuilder().setTitle(":x: Failure").setColor("#2e3036")
                        .setDescription(msg.error)
                        .addFields({
                            name: "Error message",
                            value: `\`\`\`js\n${error}\`\`\``,
                            inline: true
                        }).setTimestamp().setFooter({text: msg.botdev})], ephemeral: true
                });
            } 
        } else if (event.type === InteractionType.MessageComponent) {


        }
    }
}