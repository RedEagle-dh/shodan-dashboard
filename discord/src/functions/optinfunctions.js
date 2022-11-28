const {getResult} = require("../database/dbFunctions");
const {SelectMenuBuilder, SelectMenuOptionBuilder} = require("discord.js");

async function getDropDownMenus() {
    const dropDownMenus = await getResult(`SELECT * FROM shodan.gamecategories`);

    const menus = [];
    for (const menu of dropDownMenus) {
        const items = [];
        const dropDownMenuItems = await getResult(`SELECT * FROM shodan.games WHERE optinid = '${menu.id}'`);
        for (const item of dropDownMenuItems) {
            items.push(new SelectMenuOptionBuilder().setLabel(item.name).setValue(item.roleid).setDescription(item.description).setEmoji(item.emoji));
        }
        menus.push(new SelectMenuBuilder().addOptions(...items).setCustomId(menu.name).setMinValues(1).setMaxValues(items.length).setPlaceholder(menu.name));
    }
    return menus;
}






module.exports = { getDropDownMenus };