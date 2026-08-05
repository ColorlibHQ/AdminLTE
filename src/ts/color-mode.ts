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

import { getLifecycleSignal, onDOMContentLoaded } from './util/index'

/**
 * Constants
 * ====================================================
 */

const DATA_KEY = 'lte.color-mode'
const EVENT_KEY = `.${DATA_KEY}`
const EVENT_CHANGED = `changed${EVENT_KEY}`

const STORAGE_KEY = 'lte-theme'

const ATTRIBUTE_THEME = 'data-bs-theme'
const ATTRIBUTE_TOGGLE = 'data-bs-theme-value'
const ATTRIBUTE_DISABLED = 'data-lte-color-mode'
const ATTRIBUTE_RESOLVED = 'data-lte-theme-resolved'

const SELECTOR_TOGGLE = `[${ATTRIBUTE_TOGGLE}]`
const SELECTOR_ICON = '[data-lte-theme-icon]'

type Theme = 'light' | 'dark' | 'auto'

const THEMES = new Set<string>(['light', 'dark', 'auto'])

const isValidTheme = (value: string): value is Theme => THEMES.has(value)

/**
 * Applications with their own theming take over by adding
 * `data-lte-color-mode="off"` to <html>: ColorMode then never writes
 * `data-bs-theme` — not on load, not on a toggle click, not when the OS
 * preference changes. This is also the escape hatch for custom Bootstrap
 * themes, whose names ColorMode cannot resolve (#6084).
 *
 * Read live rather than captured, so it can be flipped at runtime.
 */
const isDisabled = (): boolean =>
  document.documentElement.getAttribute(ATTRIBUTE_DISABLED) === 'off'

/**
 * The theme the page itself declared in <html data-bs-theme="…">, or null when
 * it declared none.
 *
 * Captured once, at module evaluation, because the attribute is both an input
 * and an output: after the first `_applyTheme()` it holds ColorMode's own
 * write, which must not be mistaken for the page's intent on a later lifecycle
 * pass (Turbo, `initialize()`). Reading it here runs before any of those.
 *
 * The pre-paint snippet in <head> writes before this module is even fetched,
 * so it marks the values it computed itself with [data-lte-theme-resolved] —
 * those are not authored, and are ignored.
 */
const readMarkupTheme = (): Theme | null => {
  const { documentElement } = document

  if (documentElement.hasAttribute(ATTRIBUTE_RESOLVED)) {
    return null
  }

  const declared = documentElement.getAttribute(ATTRIBUTE_THEME)

  return declared && isValidTheme(declared) ? declared : null
}

const MARKUP_THEME = readMarkupTheme()

/**
 * Class Definition
 * ====================================================
 */

class ColorMode {
  /**
   * Read the persisted theme choice, or null when nothing was stored or
   * localStorage is unavailable (private mode, sandboxed iframe).
   */
  getStoredTheme(): Theme | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored && isValidTheme(stored) ? stored : null
    } catch {
      return null
    }
  }

  /**
   * The theme declared in the markup, for applications that render it
   * server-side from a cookie or a user record. Null when the page declared
   * none, or when the value is a custom Bootstrap theme ColorMode cannot
   * resolve — see `isDisabled` for those.
   */
  getMarkupTheme(): Theme | null {
    return MARKUP_THEME
  }

  /**
   * The user's effective choice: the stored theme, then the theme declared in
   * the markup, falling back to the OS preference. Storage comes first because
   * it is the visitor's own click on this device; markup is only the default
   * the page shipped with.
   */
  getPreferredTheme(): Theme {
    const preferred = this.getStoredTheme() ?? this.getMarkupTheme()
    if (preferred) {
      return preferred
    }

    return this._prefersDark() ? 'dark' : 'light'
  }

  /**
   * Resolve "auto" against the OS preference.
   */
  resolveTheme(theme: Theme): 'light' | 'dark' {
    if (theme === 'auto') {
      return this._prefersDark() ? 'dark' : 'light'
    }

    return theme
  }

  /**
   * Apply a theme and persist the choice. Dispatches
   * `changed.lte.color-mode` on the document with { theme, resolved }.
   */
  setTheme(theme: Theme): void {
    try {
      localStorage.setItem(STORAGE_KEY, theme)
    } catch {
      // localStorage may be unavailable; the theme still applies for this page.
    }

    this._applyTheme(theme)
    this._showActiveTheme(theme)

    document.dispatchEvent(new CustomEvent(EVENT_CHANGED, {
      detail: { theme, resolved: this.resolveTheme(theme) }
    }))
  }

  /**
   * Apply without persisting — used on init and when the OS preference
   * changes while in "auto" mode.
   */
  _applyTheme(theme: Theme): void {
    const resolved = this.resolveTheme(theme)
    document.documentElement.setAttribute(ATTRIBUTE_THEME, resolved)
    document.documentElement.style.colorScheme = resolved
  }

  /**
   * Whether the OS preference is currently dark.
   */
  _prefersDark(): boolean {
    return globalThis.matchMedia('(prefers-color-scheme: dark)').matches
  }

  /**
   * Sync the [data-bs-theme-value] toggles (active state, pressed state,
   * check mark) and the [data-lte-theme-icon] indicator icons.
   */
  _showActiveTheme(theme: Theme): void {
    document.querySelectorAll(SELECTOR_TOGGLE).forEach(toggle => {
      const isActive = toggle.getAttribute(ATTRIBUTE_TOGGLE) === theme
      toggle.classList.toggle('active', isActive)
      toggle.setAttribute('aria-pressed', String(isActive))
      toggle.querySelector('.bi-check-lg')?.classList.toggle('d-none', !isActive)
    })

    document.querySelectorAll(SELECTOR_ICON).forEach(icon => {
      icon.classList.toggle('d-none', (icon as HTMLElement).dataset.lteThemeIcon !== theme)
    })
  }

  /**
   * Apply the preferred theme and sync the UI without persisting anything.
   */
  init(): void {
    if (isDisabled()) {
      return
    }

    const theme = this.getPreferredTheme()
    this._applyTheme(theme)
    this._showActiveTheme(theme)
  }
}

/**
 * Data API implementation
 * ====================================================
 * Toggle clicks are delegated on `document`, so switcher buttons added after
 * load work and the listener survives Turbo's <body> swaps. The class is
 * stateless — everything lives in localStorage and the DOM.
 */

document.addEventListener('click', event => {
  const target = event.target

  if (!(target instanceof Element) || isDisabled()) {
    return
  }

  const toggle = target.closest(SELECTOR_TOGGLE)
  const theme = toggle?.getAttribute(ATTRIBUTE_TOGGLE)

  if (theme && isValidTheme(theme)) {
    new ColorMode().setTheme(theme)
  }
})

onDOMContentLoaded(() => {
  const colorMode = new ColorMode()
  colorMode.init()

  // Follow the OS only while the OS *is* the effective choice: nothing stored
  // and nothing declared in the markup, or an explicit "auto". A theme the
  // page declared is a preference too, and outlives an OS change (#6093).
  globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    if (isDisabled()) {
      return
    }

    const preferred = colorMode.getStoredTheme() ?? colorMode.getMarkupTheme()

    if (!preferred || preferred === 'auto') {
      colorMode._applyTheme('auto')
      colorMode._showActiveTheme(preferred ?? 'auto')
    }
  }, { signal: getLifecycleSignal() })
})

export default ColorMode
