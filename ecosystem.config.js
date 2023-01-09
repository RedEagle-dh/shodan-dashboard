module.exports = {
    apps: [{
        name: "SHODAN",
        script: "./discord/src/index.js",
        error_file: "./--error",
        out_file: './discordLogs/out.log',
        log_date_format: 'YYYY-MM-DD HH:mm:ss:SSS'
    }]
}
