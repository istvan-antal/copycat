export const SWITCH_CURRENT_VIEW = 'SWITCH_CURRENT_VIEW';

export function switchCurrentView(view) {
    return { type: SWITCH_CURRENT_VIEW, view };
}