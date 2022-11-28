const {EmbedBuilder} = require("discord.js");

function getOptInEmbed() {
    return new EmbedBuilder().setColor("#2e3036").setTitle("Choose a game")
        .setDescription("Choose a game you'd like to view!");
}

function getSuccessEmbed(message) {
    return new EmbedBuilder().setColor("#2e3036").addFields({
        name: ":white_check_mark: Success",
        value: message,
        inline: true
    })
}

function getErrorEmbed(message) {
    return new EmbedBuilder().setColor("#2e3036").addFields({
        name: ":x: Failure",
        value: message,
        inline: true
    })
}

function getRolesUpdatedEmbed(addedList, removedList) {
    if (addedList.length === 0) {
        addedList.push("None");
    }
    if (removedList.length === 0) {
        removedList.push("None");
    }
    return new EmbedBuilder().setTitle("🎭 Roles updated!")
        .setDescription(`**Added:**\n${addedList.join("\n")}\n\n**Removed:**\n${removedList.join("\n")}`).setColor("#2e3036")
}

function getEventDmEmbed() {
    return new EmbedBuilder().setColor("#2e3036").setTitle("Event reminder")
        .setDescription("You clicked on 'interesting' for this event. You will be reminded 1 week before the event starts and on the actual day.\n" +
            "By the way - you can add the event to your calendar by downloading the .ics file. Just click on the event, then on the `...` and there you go!");
}

function getEventDmUpdateEmbed() {
    return new EmbedBuilder().setColor("#2e3036").setTitle("Event reminder")
        .setDescription("Event updated!");
}

function getEventDmDelEmbed() {
    return new EmbedBuilder().setColor("#2e3036").setTitle("Event reminder")
        .setDescription("This event has been cancelled.");
}

function getEventDmUnsubscribeEmbed() {
    return new EmbedBuilder().setColor("#2e3036").setTitle("Event reminder")
        .setDescription("You have been unsubscribed from this event.");
}

function getMemberWelcomeEmbed(guildName, user, randomMsg) {
    if (!randomMsg) {
        return new EmbedBuilder().setColor("#2e3036").setTitle("User joined!")
            .setDescription(`Welcome to **${guildName}** ${user}! \nMake sure to tak a peek to our #rules and head on over 
        to the #join channel to explore all the hubs that we offer.`);
    } else {
        return new EmbedBuilder().setColor("#2e3036").setTitle("User joined!")
            .setDescription(`Welcome to **${guildName}** ${user}! \nMake sure to tak a peek to our #rules and head on over 
        to the #join channel to explore all the hubs that we offer.\n\n${randomMsg}`);
    }
}


function getMemberLeaveEmbed(user, randomMsg) {
    return new EmbedBuilder().setColor("#2e3036").setTitle("User left!")
        .setDescription(`${user} ${randomMsg}`);
}


module.exports =
    {
        getOptInEmbed,
        getSuccessEmbed,
        getErrorEmbed,
        getRolesUpdatedEmbed,
        getEventDmEmbed,
        getEventDmDelEmbed,
        getEventDmUpdateEmbed,
        getEventDmUnsubscribeEmbed,
        getMemberWelcomeEmbed,
        getMemberLeaveEmbed
    };