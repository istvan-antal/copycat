/* eslint no-console: 0, strict: 0, prefer-arrow-callback: 0 */
'use strict';
const spawn = require('child_process').spawn;
const { trimOutput, isProgressLine, getProgressValues } = require('./rsyncOutputParser');
const { RsyncOperation } = require('./RsyncOperation');

function getLocalToRemoteSyncCommand(localPath, remotePath) {
    return `rsync -avzP --delete ${localPath} ${remotePath}`;
}

function getRemoteToLocalSyncCommand(localPath, remotePath) {
    return `rsync -avzP ${remotePath} ${localPath}`;
}

function runSyncCommand(command) {
    const proc = spawn('/bin/sh', ['-c', command]);
    let progressDescription = '';
    const result = new RsyncOperation(function doRsync(resolve, reject) {
        proc.on('close', (code) => {
            if (code === 0) {
                resolve(true);
                return;
            }
            reject(new Error(`child process exited with code ${code}`));
        });
    });

    proc.stdout.on('data', (data) => {
        const line = trimOutput(data);
        if (isProgressLine(line)) {
            result.makeProgress(Object.assign(getProgressValues(line), {
                description: progressDescription
            }));
        } else {
            progressDescription = line;
        }
    });

    return result;
}

function syncRemoteToLocal(localPath, remotePath) {
    return runSyncCommand(getRemoteToLocalSyncCommand(localPath, remotePath));
}

function syncLocalToRemote(localPath, remotePath) {
    return runSyncCommand(getLocalToRemoteSyncCommand(localPath, remotePath));
}
//
module.exports.syncRemoteToLocal = syncRemoteToLocal;
module.exports.syncLocalToRemote = syncLocalToRemote;
/*
syncRemoteToLocal('~/Music', 'hive:~/Music').onProgress(({ percentage, speedText }) => {
    console.log(percentage, speedText);
}).then(() => {
    console.log('done');
}, (e) => {
    console.error('fail', e);
});*/