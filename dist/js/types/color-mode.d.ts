/**
 * --------------------------------------------
 * @file AdminLTE color-mode.ts
 * @description Color mode (light/dark/auto) switcher for AdminLTE.
 * Resolves the theme from, in order: the visitor's stored choice, the theme
 * the page itself declared in <html data-bs-theme="…">, and finally the OS
 * preference. Keeps [data-bs-theme-value] toggles and [data-lte-theme-icon]
 * indicator icons in sync.
 *
 * Ships in the bundle so applications no longer need to copy the demo's
 * inline script. The tiny no-flash snippet in <head> (see _head.astro)
 * remains inline by design — it must run before first paint. That snippet
 * flags the values it computes itself with [data-lte-theme-resolved], so a
 * theme authored in the markup can be told apart from one it resolved.
 *
 * Applications with their own theming opt out entirely with
 * <html data-lte-color-mode="off">.
 * @license MIT
 * --------------------------------------------
 */
type Theme = 'light' | 'dark' | 'auto';
/**
 * Class Definition
 * ====================================================
 */
declare class ColorMode {
    /**
     * Read the persisted theme choice, or null when nothing was stored or
     * localStorage is unavailable (private mode, sandboxed iframe).
     */
    getStoredTheme(): Theme | null;
    /**
     * The theme declared in the markup, for applications that render it
     * server-side from a cookie or a user record. Null when the page declared
     * none, or when the value is a custom Bootstrap theme ColorMode cannot
     * resolve — see `isDisabled` for those.
     */
    getMarkupTheme(): Theme | null;
    /**
     * The user's effective choice: the stored theme, then the theme declared in
     * the markup, falling back to the OS preference. Storage comes first because
     * it is the visitor's own click on this device; markup is only the default
     * the page shipped with.
     */
    getPreferredTheme(): Theme;
    /**
     * Resolve "auto" against the OS preference.
     */
    resolveTheme(theme: Theme): 'light' | 'dark';
    /**
     * Apply a theme and persist the choice. Dispatches
     * `changed.lte.color-mode` on the document with { theme, resolved }.
     */
    setTheme(theme: Theme): void;
    /**
     * Apply without persisting — used on init and when the OS preference
     * changes while in "auto" mode.
     */
    _applyTheme(theme: Theme): void;
    /**
     * Whether the OS preference is currently dark.
     */
    _prefersDark(): boolean;
    /**
     * Sync the [data-bs-theme-value] toggles (active state, pressed state,
     * check mark) and the [data-lte-theme-icon] indicator icons.
     */
    _showActiveTheme(theme: Theme): void;
    /**
     * Apply the preferred theme and sync the UI without persisting anything.
     */
    init(): void;
}
export default ColorMode;
