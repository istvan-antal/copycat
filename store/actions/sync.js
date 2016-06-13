export const START_SYNC = 'START_SYNC';
export const STOP_SYNC = 'STOP_SYNC';

export function startSync(syncType) {
    return { type: START_SYNC, syncType };
}

export function stopSync() {
    return { type: STOP_SYNC };
}