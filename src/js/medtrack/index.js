/* src/js/medtrack/index.js */
import { initState } from "./state.js";
import LocalAdapter from "./storage/local-adapter.js";

const seed = {
  _v: 1,
  hospitals: [
    { code: "H01", name: "Hospital A", stakeholders: 3, contacts: null },
    { code: "H02", name: "Hospital B", stakeholders: 2, contacts: null }
  ],
  tasks: []
};

(async function bootstrap() {
  await initState({ useAdapter: LocalAdapter, seed });
  console.info("medtrack: initialized (local adapter)");
  // visible badge to confirm medtrack loaded
  if (typeof document !== "undefined") {
    const el = document.createElement("div");
    el.id = "medtrack-badge";
    el.textContent = "MedTrack (state ok)";
    el.style.position = "fixed";
    el.style.right = "12px";
    el.style.bottom = "12px";
    el.style.zIndex = "9999";
    el.style.background = "#007bff";
    el.style.color = "#fff";
    el.style.padding = "6px 10px";
    el.style.borderRadius = "6px";
    el.style.fontSize = "12px";
    document.body.appendChild(el);
  }
})();
