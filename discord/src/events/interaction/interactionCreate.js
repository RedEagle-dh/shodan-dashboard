const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require("discord.js");

const msg = require("../../messages.json");
const { InteractionType, ButtonStyle } = require("discord-api-types/v10");
const { getSuccessEmbed, getRolesUpdatedEmbed, bugReportDMEmbed } = require("../../embed/embedCreation");
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
                    switch (event.customId) {
                        case "delete": {
                            await event.message.delete();
                            break;
                        }
                        case "fixed": {
                            const eb = event.message.embeds[0];
                            eb.data.fields[2].value = "Fixed";
                            eb.data.title = "<:checkmark:1062042357769457764> This bug has been fixed.";
                            await event.update({ components: [], embeds: [eb]});
                            break;
                        }
                        case "lowpriority": {
                            const eb = event.message.embeds[0];
                            eb.data.fields[2].value = "<:greendot:1062045050047049789>";
                            await event.update({embeds: [eb]});
                            break;
                        }
                        case "midpriority": {
                            const eb = event.message.embeds[0];
                            eb.data.fields[2].value = "<:yellowdot:1062045057714233536>";
                            await event.update({embeds: [eb]});
                            break;
                        }
                        case "highpriority": {
                            const eb = event.message.embeds[0];
                            eb.data.fields[2].value = "<:reddot:1062045055407374407>";
                            await event.update({embeds: [eb]});
                            break;
                        }
                    }
                } else if (event.isSelectMenu()) {

                    const dropDownMenus = JSON.parse(await db.get("optin"));
                    
                        if (event.customId === "help") {
                            await route(event.values[0], event);
                        } else if (dropDownMenus[event.customId] !== null || dropDownMenus[event.customId] !== undefined) {
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
            case InteractionType.ModalSubmit: {
                switch (event.customId) {
                    case "bugreport": {
                        const title = event.fields.getTextInputValue('bugtitle');
                        const description = event.fields.getTextInputValue('bugdescription');
                        const priority = event.fields.getTextInputValue('bugprio');

                        await event.reply({ content: '<:checkmark:1062042357769457764> Your report was received successfully!', ephemeral: true });


                        const dave = client.users.cache.find(user => user.id === "324890484944404480");

                        const rowPrio = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setCustomId("highpriority").setEmoji("<:reddot:1062045055407374407>").setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId("midpriority").setEmoji("<:yellowdot:1062045057714233536>").setStyle(ButtonStyle.Secondary),
                                new ButtonBuilder().setCustomId("lowpriority").setEmoji("<:greendot:1062045050047049789>").setStyle(ButtonStyle.Secondary)
                            );
                        const rowDone = new ActionRowBuilder()
                            .addComponents(
                                new ButtonBuilder().setCustomId("fixed").setEmoji("<:checkmark:1062042357769457764>").setLabel("Fixed").setStyle(ButtonStyle.Success),
                                new ButtonBuilder().setCustomId("delete").setEmoji("<:xmarker:1062042335015358514>").setLabel("Delete").setStyle(ButtonStyle.Danger)
                            );


                        await dave.send({ embeds: [bugReportDMEmbed(title, description, priority, event)], components: [rowPrio, rowDone] });
                        break;
                    }
                }
                break;
            }
        }
        if (event.type === InteractionType.ApplicationCommand) {
            const command = event.client.commands.get(event.commandName);
            if (!command) return;
            try {
                log.info(`${event.user.tag} used /${event.commandName}`)
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