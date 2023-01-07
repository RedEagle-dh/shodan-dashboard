const { exit } = require('process');
function redisAlive(db, log) {
    db.ping((err, result) => {
        if (err) {
            log.fatal(err);
        }
        if (result === "PONG") {
            log.success("Redis is alive!");
        }
    }).catch(() => {
        log.fatal("Redis is not alive!");
        exit();
    })
}

function variablesAlive(process, log) {

    if (process.env.DISCORD_BOT_TOKEN !== undefined) {
        log.info("Environment variables loaded!");
    } else {
        log.fatal("Environment variables not defined!");
    }
}


module.exports = {
    redisAlive,
    variablesAlive
};