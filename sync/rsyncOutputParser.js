const progressLinePattern = /^\S+\s+(\d{1,2})%\s+(\d+?.\d*\w+\/s)\s+\d{1,2}:\d{2}:\d{2}$/;

function isProgressLine(string) {
    return progressLinePattern.test(string);
}

function trimOutput(buffer) {
    return buffer.toString('utf-8').replace(/\n/g, '').trim();
}

function getProgressValues(line) {
    const values = progressLinePattern.exec(line);
    return {
        percentage: parseInt(values[1], 10),
        speedText: values[2]
    };
}

module.exports.trimOutput = trimOutput;
module.exports.isProgressLine = isProgressLine;
module.exports.getProgressValues = getProgressValues;