/**
 * Provides keyboard shortcuts API
 */

let mods: string[] = [];
let keyMap: KeyMap = {} as KeyMap;

export const ESC = "Escape";
export const CTRL_LEFT = "ControlLeft";
export const SHIFT_LEFT = "ShiftLeft";
export const ALT_LEFT = "AltLeft";
export const SPACE = "Space";

export function setShortcut(
    modKeys: string[], triggerKey: string, handler: EventListener) {
  let keyPrefix = generateKeymapKey(modKeys);
  setKeyMap(keyPrefix, triggerKey, handler);
}

export function removeShortcut(modKeys: string[], triggerKey: string) {
  let keyPrefix = generateKeymapKey(modKeys);
  rmKeyMap(keyPrefix, triggerKey);
}

export function start(w: Window) {
  w.addEventListener("keydown", onGlobalKeyDown);
  w.addEventListener("keyup", onGlobalKeyUp);
}

export function stop(w: Window) {
  w.removeEventListener("keydown", onGlobalKeyDown);
  w.removeEventListener("keyup", onGlobalKeyUp);
}

interface KeyMap {
  [k: string]: DirectKeyMap
}

interface DirectKeyMap {
  [k: string]: EventListener
}

function generateKeymapKey(modKeys: string[]): string {
  modKeys = modKeys.sort();
  let key: string[] = [];
  for (let v of modKeys) {
    key.push(v);
  }
  return key.join();
}

function queryKeyMap(fullKeyPrefix: string, key: string): EventListener {
  if (keyMap[fullKeyPrefix]) {
    if (keyMap[fullKeyPrefix][key]) {
      return keyMap[fullKeyPrefix][key];
    }
  }
  return null;
}

function setKeyMap(fullKeyPrefix: string, key: string, handler: EventListener) {
  let kmap: DirectKeyMap = keyMap[fullKeyPrefix];
  if (!kmap) {
    kmap = {} as DirectKeyMap;
    keyMap[fullKeyPrefix] = kmap;
  }
  kmap[key] = handler;
}

function rmKeyMap(fullKeyPrefix: string, key: string) {
  let kmap: DirectKeyMap = keyMap[fullKeyPrefix];
  if (kmap) {
    if (kmap[key]) {
      delete kmap[key];
    }
  }
}

function onModKeyStart(modKey: string){
  mods.push(modKey);
}

function onModKeyEnd(modKey: string) : boolean{
  let idx: number = mods.indexOf(modKey);
  if (idx > -1){
    mods.splice(idx, 1);
    return true;
  }
  return false;
}

function getEventKey(e: KeyboardEvent): string {
  return e.code;
}

function onGlobalKeyDown(e: KeyboardEvent): void{
  let mod = getEventKey(e);
  onModKeyStart(mod);
}

function onGlobalKeyUp(e: KeyboardEvent): void{
  let mod = getEventKey(e);
  let found = onModKeyEnd(mod);
  if (!found){
    return;
  }
  let modsPrefix = generateKeymapKey(mods);
  let handler = queryKeyMap(modsPrefix, mod);
  if (handler){
    try {
      handler(e);
    } catch (e){
      if (e && e.message){
        err(e.message);
      } else {
        err(e);
      }
    }
  }
  reset();
}

function reset(){
  mods.length = 0;
}

function log(msg : string){
  if (console && console.log){
    console.log(msg);
  }
}

function err(msg: string){
  if (console && console.error){
    console.error(msg);
  }
}