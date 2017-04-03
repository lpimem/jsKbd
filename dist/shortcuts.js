"use strict";
exports.__esModule = true;
var mods = [];
var keyMap = {};
exports.ESC = "Escape";
exports.CTRL_LEFT = "ControlLeft";
exports.SHIFT_LEFT = "ShiftLeft";
exports.ALT_LEFT = "AltLeft";
exports.SPACE = "Space";
function setShortcut(modKeys, triggerKey, handler) {
    var keyPrefix = generateKeymapKey(modKeys);
    setKeyMap(keyPrefix, triggerKey, handler);
}
exports.setShortcut = setShortcut;
function removeShortcut(modKeys, triggerKey) {
    var keyPrefix = generateKeymapKey(modKeys);
    rmKeyMap(keyPrefix, triggerKey);
}
exports.removeShortcut = removeShortcut;
function start(w) {
    w.addEventListener("keydown", onGlobalKeyDown);
    w.addEventListener("keyup", onGlobalKeyUp);
}
exports.start = start;
function stop(w) {
    w.removeEventListener("keydown", onGlobalKeyDown);
    w.removeEventListener("keyup", onGlobalKeyUp);
}
exports.stop = stop;
function generateKeymapKey(modKeys) {
    modKeys = modKeys.sort();
    var key = [];
    for (var _i = 0, modKeys_1 = modKeys; _i < modKeys_1.length; _i++) {
        var v = modKeys_1[_i];
        key.push(v);
    }
    return key.join();
}
function queryKeyMap(fullKeyPrefix, key) {
    if (keyMap[fullKeyPrefix]) {
        if (keyMap[fullKeyPrefix][key]) {
            return keyMap[fullKeyPrefix][key];
        }
    }
    return null;
}
function setKeyMap(fullKeyPrefix, key, handler) {
    var kmap = keyMap[fullKeyPrefix];
    if (!kmap) {
        kmap = {};
        keyMap[fullKeyPrefix] = kmap;
    }
    kmap[key] = handler;
}
function rmKeyMap(fullKeyPrefix, key) {
    var kmap = keyMap[fullKeyPrefix];
    if (kmap) {
        if (kmap[key]) {
            delete kmap[key];
        }
    }
}
function onModKeyStart(modKey) {
    mods.push(modKey);
}
function onModKeyEnd(modKey) {
    var idx = mods.indexOf(modKey);
    if (idx > -1) {
        mods.splice(idx, 1);
        return true;
    }
    return false;
}
function getEventKey(e) {
    return e.code;
}
function onGlobalKeyDown(e) {
    var mod = getEventKey(e);
    onModKeyStart(mod);
}
function onGlobalKeyUp(e) {
    var mod = getEventKey(e);
    var found = onModKeyEnd(mod);
    if (!found) {
        return;
    }
    var modsPrefix = generateKeymapKey(mods);
    var handler = queryKeyMap(modsPrefix, mod);
    if (handler) {
        try {
            handler(e);
        }
        catch (e) {
            if (e && e.message) {
                err(e.message);
            }
            else {
                err(e);
            }
        }
    }
    reset();
}
function reset() {
    mods.length = 0;
}
function log(msg) {
    if (console && console.log) {
        console.log(msg);
    }
}
function err(msg) {
    if (console && console.error) {
        console.error(msg);
    }
}
