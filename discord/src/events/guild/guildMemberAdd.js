const {getMemberWelcomeEmbed} = require("../../embed/embedCreation");
const {getRandomMsg} = require("../../functions/randomMsg");

module.exports = {
    name: 'guildMemberAdd',
    async execute(member, db, log, client) {
        const guild = member.guild;
        const channelids = JSON.parse(await db.get("channels"));
        const memberWelcomeChannelId = channelids.memberWelcomeTextchannel;
        if (memberWelcomeChannelId === null) {
            log.warn("GuildMemberAdd:11 - No Channel Set"); 
            return
        }
    
        const memberWelcomeChannel = await guild.channels.cache.find(c => c.id === memberWelcomeChannelId);
        if (!memberWelcomeChannel) {
            log.warn("GuildMemberAdd:17 - Channel doesn't exist");
            return;
        }
        memberWelcomeChannel.send({embeds: [getMemberWelcomeEmbed(guild.name, member.user)]});
        await member.user.send({embeds: [getMemberWelcomeEmbed(guild.name, member.user, await getRandomMsg("memberJoin", db))]});

        const memberCountChannelId = channelids.memberCountVoicechannel;
        const memberCountChannel = await guild.channels.cache.find(c => c.id === memberCountChannelId);

        if (memberCountChannel) {
            memberCountChannel.setName(`👥 Members: ${guild.memberCount}`);
        }
    }
}