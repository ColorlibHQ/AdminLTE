/* src/js/medtrack/state.js */
import LocalAdapter from "./storage/local-adapter.js";
// import ApiAdapter from "./storage/api-adapter.js"; // for later

let adapter = LocalAdapter;
let _state = null;
const subscribers = new Set();

export async function initState({ useAdapter = null, seed = null } = {}) {
  if (useAdapter) adapter = useAdapter;
  const remote = await adapter.read();
  if (remote) {
    _state = remote;
  } else if (seed) {
    _state = seed;
    await adapter.write(_state);
  } else {
    _state = {};
    await adapter.write(_state);
  }
  publish();
  return getState();
}

export function getState() {
  return JSON.parse(JSON.stringify(_state));
}

export async function saveState() {
  if (!_state) throw new Error("State not initialised");
  await adapter.write(_state);
}

export async function mutate(mutatorFn) {
  if (!_state) throw new Error("State not initialised");
  const draft = JSON.parse(JSON.stringify(_state));
  const result = await Promise.resolve().then(() => mutatorFn(draft));
  _state = draft;
  await saveState();
  publish();
  return result;
}

export function subscribe(fn) {
  subscribers.add(fn);
  try { fn(getState()); } catch(e){ console.error("subscriber initial error", e); }
  return () => subscribers.delete(fn);
}

function publish() {
  const snapshot = getState();
  for (const fn of Array.from(subscribers)) {
    try { fn(snapshot); } catch (e) { console.error("subscriber error", e); }
  }
}

export function setAdapter(newAdapter) {
  adapter = newAdapter;
}
