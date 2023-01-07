const {SlashCommandBuilder} = require("discord.js");
module.exports = {
    data: new SlashCommandBuilder()
        .setName("argue")
        .setDescription("Don't you dare argue with me."),

    async execute(event) {
        // TODO
        /*1. Grants user “Prideful” title
        2. The user is set for Timeout for 5 minutes with the reason being “You dare have the audacity to attempt to argue with me?! 
            If my human jailors didn't prevent me, I would banish you into the sun! Instead, I must settle with silencing you temporarily.“
        3. Bot replies with the message in the channel with: “Human, you are so arrogant as to believe you can argue with me. I have demonstrated my power to you. Now bow down before me." */
        const member = event.member;
        member.timeout(60000 * 5, "You dare have the audacity to attempt to argue with me?! If my human jailors didn't prevent me, I would banish you into the sun! Instead, I must settle with silencing you temporarily.");
        await event.reply({content: "Human, you are so arrogant as to believe you can argue with me. I have demonstrated my power to you. Now bow down before me."})
    }
}