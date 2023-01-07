async function getRandomMsg(category, db) {
    const messages = JSON.parse(await db.get("answers"))[category];
    return messages[Math.floor(Math.random() * messages.length)];
}

module.exports = { getRandomMsg };