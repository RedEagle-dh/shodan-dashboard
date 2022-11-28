const {EmbedBuilder} = require("discord.js");

function botDevCommands() {
    return new EmbedBuilder().setTitle("Bot Developer Commands").setDescription("Commands only for the bot-dev")
        .setColor("#0033cc").addFields({
            name: "<a:ci_gear1:1016351751768641556> Help",
            value: "> `/eval` - Evaluating javascript code",
            inline: false
        })
}

async function adminCommands() {
    return new EmbedBuilder().setTitle("Admin Commands").setDescription("Commands for administrators")
        .setColor("#cc0000").addFields(
            {
                name: "<:slashcmd:1030054183468007484> Utility",
                value: "> `/say` - Use \\n to create a line break. Codeblocks are not supported\n" +
                    `> \`/set\` - Setting the channel for logs, the prefix, etc.`,
                inline: false
            })
}

async function memberCommands() {
    return new EmbedBuilder().setTitle("Member Commands").setDescription("Commands for everybody")
        .setColor("#009933").addFields(
            {
                name: "<:slashcmd:1030054183468007484> Utility",
                value: "> `/help` - Shows this message\n" +
                    "> `/ping` - Shows the bot's ping\n",
                inline: false
            }
        )
}


function modCommands() {
    return new EmbedBuilder().setTitle("Moderator Commands").setDescription("Commands for all with the permissions `ManageMessages`")
        .setColor("#ffcc00").addFields({
            name: "<:slashcmd:1030054183468007484> Utility",
            value: "> `/xx` - xxxxxxxx\n",
            inline: false
        })
}

function botFunctions() {
    return new EmbedBuilder().setTitle("Bot Functions").setDescription("Every functions/features the bot has")
        .setColor("#ffffff").addFields(
            {
                name: "🎟️ Roleselection",
                value: "> Erstelle neue Ticket Kategorien\n" +
                    "> Ein Ticket entspricht einem privaten Thread\n" +
                    "> Jedes Ticket hat eine Rolle die als Bearbeiter fungiert\n",
                inline: false
            },
            {
                name: "📥 Event Announcement",
                value: "> Hinterlasse anonymen Lob, Kritik einem Kanal\n" +
                    "> Hinterlasse nicht-anonyme Wünsche in einem Kanal\n",
                inline: false
            },
            {
                name: "📥 Member Counter",
                value: "> Hinterlasse anonymen Lob, Kritik",
                inline: false
            }
        )
}


module.exports = {
    adminCommands,
    memberCommands,
    modCommands,
    botFunctions,
    botDevCommands
}