function getNewId(oldId) {
    let newId;
    try {
        newId = Number(oldId[0].id) + 1;
    } catch (e) {
        newId = 1;
    }
    return newId;
}



module.exports = { getNewId }