const {SelectMenuBuilder, SelectMenuOptionBuilder} = require("discord.js");

async function getDropDownMenus(db) {
    
    const dropDownMenus = JSON.parse(await db.get("optin"));
    const menus = [];
    for (const menu of Object.keys(dropDownMenus)) {
        const m = dropDownMenus[menu];
        const items = [];
        for (const item of m.selections) {
            items.push(new SelectMenuOptionBuilder().setLabel(item.name).setValue(item.role).setDescription(item.description).setEmoji(item.emoji));
        }
        menus.push(new SelectMenuBuilder().addOptions(...items).setCustomId(m.name).setMinValues(1).setMaxValues(items.length).setPlaceholder(m.name));
    }
    return menus;
}

async function getDocument(db, doc) {
    const jsonObj = JSON.parse(await db.get(`${doc}`))
    return jsonObj;
}

async function setDocument(db, doc, docname) {
    const jsonObj = await db.set(`${docname}`, JSON.stringify(doc))
    return jsonObj;
}






module.exports = { getDropDownMenus, getDocument, setDocument };