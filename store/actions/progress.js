export const UPDATE_PROGRESS = 'UPDATE_PROGRESS';

export function updateProgress(progress) {
    return { type: UPDATE_PROGRESS, progress };
}