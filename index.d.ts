// Type definitions for jskbd
// Project: jskbd
// Definitions by: lpimem https://www.npmjs.com/~lpimem

export function setShortcut(modKeys: string[], triggerKey: string, handler: EventListener): void;
export function removeShortcut(modKeys: string[], triggerKey: string): void;
export function start(w: Window): void;
export function stop(w: Window): void;

export const ESC : string;
export const CTRL_LEFT : string;
export const SHIFT_LEFT : string;
export const ALT_LEFT : string;
export const SPACE : string;