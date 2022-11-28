function splitInputDate(duration) {
    const number = duration.split(/(\d+)/)[1];
    const identifier = duration.split(/[0-9]/)[duration.length - 1];
    return [number, identifier];
}

module.exports = {splitInputDate}