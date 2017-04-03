export declare const ESC = "Escape";
export declare const CTRL_LEFT = "ControlLeft";
export declare const SHIFT_LEFT = "ShiftLeft";
export declare const ALT_LEFT = "AltLeft";
export declare const SPACE = "Space";
export declare function setShortcut(modKeys: string[], triggerKey: string, handler: EventListener): void;
export declare function removeShortcut(modKeys: string[], triggerKey: string): void;
export declare function start(w: Window): void;
export declare function stop(w: Window): void;
