const { getResult } = require("../database/dbFunctions");

async function getRandomMsg(category) {
    const randomMsg = await getResult(`SELECT * FROM shodan.botmessages WHERE category = '${category}' ORDER BY RAND() LIMIT 1`);
    return randomMsg[0].message;
}

module.exports = { getRandomMsg };