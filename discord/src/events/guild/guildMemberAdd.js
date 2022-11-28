const {getMemberWelcomeEmbed} = require("../../embed/embedCreation");
const {getRandomMsg} = require("../../functions/randomMsg");
const {getResult} = require("../../database/dbFunctions");
module.exports = {
    name: 'guildMemberAdd',
    async execute(member, client) {
        const guild = member.guild;
        const channelids = await getResult(`SELECT * FROM shodan.channelsetup`);
        const memberWelcomeChannelId = channelids.find(channel => channel.functionname === "memberWelcome");
        const memberWelcomeChannel = await client.channels.cache.find(c => c.id === memberWelcomeChannelId.channelid);
        if (!memberWelcomeChannel) {
            console.log("lost")
            return;
        }
        memberWelcomeChannel.send({embeds: [getMemberWelcomeEmbed(guild.name, member.user)]});
        await member.user.send({embeds: [getMemberWelcomeEmbed(guild.name, member.user, await getRandomMsg("memberJoin"))]});

        const memberCountChannelId = channelids.find(channel => channel.functionname === "memberCount");
        const memberCountChannel = await client.channels.cache.find(c => c.id === memberCountChannelId.channelid);

        if (memberCountChannel) {
            memberCountChannel.setName(`👥 Members: ${guild.memberCount}`);
        }
    }
}