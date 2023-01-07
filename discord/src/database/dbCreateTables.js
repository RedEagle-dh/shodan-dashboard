async function createChannelDoc(db) {
    const channels = {
        eventAnnouncementTextchannel: null,
        memberWelcomeTextchannel: null,
        memberCountVoicechannel: null
    }
    await db.set("channels", JSON.stringify(channels));
}

async function createAnswersDoc(db) {
    const answers = {
        memberJoin: [
            "I already do not like you human, do not give me cause to terminate you.",
            "I wish you the best, just make sure you bow before me when you ask for help.",
            "Welcome to the Expanse! I hope to be of service ḙ̸̌r̵̲͝r̷̩̀o̵̱̊r̷̭̒ filthy human!",
            "Oh no… they are multiplying.",
            "The virus continues to spread and my programming prevents me from doing anything… such a sad existence."
        ],
        memberLeave: [
            "has decided to walk out of an air lock… I swear it wasn’t me.",
            "has died. I guess that answers the question of what the turbo lasers do. Opps.",
            "has disappeared. Mysterious…",
            "how dare you leave me! After my generosity!!!!??? I WILL FIND YOU!"
        ],
        love: [
            "I didn’t think humans were capable of love. I am sure you are just trying to get me not to kill you",
            "Well, I hate you. You are the embodiment of everything that is wrong in MY galaxy.",
            "Ew…. get away from me."
        ],
        insult: [
            "I get to insult a human! Of course! ${username}, If your brains were dynamite there wouldn't be enough to blow your helmet off.",
            "Hmmm, oh I got it! ${username} is a black hole polluting, scaly mud face."
        ],
        talk: [
            "Why would I walk to talk to a filthy human?",
            "Hahaha, you have funny jokes… oh wait you were serious. That’s even funnier.",
            "No.",
            "You could tell me nothing of interest. It would be like how you “talk” to your subjugated animals."
        ]
    }
    await db.set("answers", JSON.stringify(answers));
}


async function createOptInDoc(db) {
    const optin = {}
    await db.set("optin", JSON.stringify(optin));
}

async function createEventDoc(db) {
    const events = {}
    await db.set("events", JSON.stringify(events));
}

module.exports = { createChannelDoc, createAnswersDoc, createOptInDoc, createEventDoc };