class Logger {
    constructor() {
    }

    trace(message) {
        console.log(`${createDateString(new Date())} 📑 \x1b[46mTRACE\x1b[0m      : ${message}`)
    }
    debug(message) {
        console.log(`${createDateString(new Date())} 🔹 \x1b[36mDEBUG\x1b[0m      : ${message}`)
    }
    info(message) {
        console.log(`${createDateString(new Date())} 🆗 \x1b[34mINFO\x1b[0m       : ${message}`)

    }
    warn(message) {
        console.log(`${createDateString(new Date())} ⚠️  \x1b[33mWARN\x1b[0m       : ${message}`)

    }
    error(message) {
        console.log(`${createDateString(new Date())} 💢 \x1b[31mERROR\x1b[0m      : ${message}`)
    }
    fatal(message) {
        console.log(`${createDateString(new Date())} 💀 \x1b[35mFATAL\x1b[0m      : ${message}`)

    }
    success(message) {
        console.log(`${createDateString(new Date())} ✅ \x1b[32mSUCCESS\x1b[0m    : ${message}`)

    }
}

function createDateString(date) {
    return `[${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds().toString().length === 1 ? `0${date.getSeconds()}` : date.getSeconds()}]`
}

module.exports = { Logger };