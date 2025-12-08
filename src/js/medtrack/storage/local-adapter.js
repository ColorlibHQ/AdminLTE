/* src/js/medtrack/storage/local-adapter.js */
const STORAGE_KEY = "medtrack_v1";

export default {
  async read() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (err) {
      console.error("medtrack: failed to parse local state", err);
      return null;
    }
  },

  async write(state) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      return true;
    } catch (err) {
      console.error("medtrack: failed to write local state", err);
      return false;
    }
  },

  async clear() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
