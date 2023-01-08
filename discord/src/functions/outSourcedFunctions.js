
function objectIsEmpty(doc) {
    if (JSON.stringify(doc) !== JSON.stringify({})) return false;
    else return true;
}


module.exports = {objectIsEmpty}