/* src/js/medtrack/storage/api-adapter.js */
const BASE = "/api/medtrack";

export default {
  async read() {
    try {
      const res = await fetch(`${BASE}/state`, { credentials: "same-origin" });
      if (!res.ok) return null;
      return res.json();
    } catch (err) {
      console.error("medtrack api read failed", err);
      return null;
    }
  },

  async write(state) {
    try {
      const res = await fetch(`${BASE}/state`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin",
        body: JSON.stringify(state)
      });
      return res.ok;
    } catch (err) {
      console.error("medtrack api write failed", err);
      return false;
    }
  },

  async clear() {
    try {
      await fetch(`${BASE}/state`, { method: "DELETE", credentials: "same-origin" });
    } catch (err) {
      console.error("medtrack api clear failed", err);
    }
  }
};
