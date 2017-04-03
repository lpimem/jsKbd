/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * Provides keyboard shortcuts API
 */

Object.defineProperty(exports, "__esModule", { value: true });
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


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var shortcuts = __webpack_require__(0);
module.exports = shortcuts;


/***/ })
/******/ ]);