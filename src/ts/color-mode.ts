/**
 * ----------------------------------------------------------------------------
 * @file AdminLTE color-mode.ts
 * @description Color mode (light/dark/auto) switcher for AdminLTE.
 * Persists the choice in localStorage, follows the OS preference in "auto"
 * mode, and keeps [data-bs-theme-value] toggles and [data-lte-theme-icon]
 * indicator icons in sync.
 *
 * Ships in the bundle so applications no longer need to copy the demo's inline
 * script. The tiny no-flash snippet in <head> (see _head.astro) remains inline
 * by design — it must run before first paint.
 * @license MIT
 * ----------------------------------------------------------------------------
 */

import { getLifecycleSignal, onDOMContentLoaded } from './util/index'

/**
 * ----------------------------------------------------------------------------
 * Constants
 * ----------------------------------------------------------------------------
 */

const DATA_KEY = 'lte.color-mode'
const EVENT_KEY = `.${DATA_KEY}`
const EVENT_CHANGED = `changed${EVENT_KEY}`

const STORAGE_KEY = 'lte-theme'

const SELECTOR_TOGGLE = '[data-bs-theme-value]'
const SELECTOR_ICON = '[data-lte-theme-icon]'

/**
 * Define a Theme type to restrict the possible values for theme selection.
 */
type Theme = 'light' | 'dark' | 'auto'

/**
 * ----------------------------------------------------------------------------
 * Class Definition
 * ----------------------------------------------------------------------------
 * Note we do not extends from BaseComponent because ColorMode is stateless
 * and does not need to be instantiated per element. It operates globally on
 * the document.
 * ----------------------------------------------------------------------------
 */

class ColorMode {
  /**
   * Read the persisted theme choice, or null when nothing was stored or
   * localStorage is unavailable (private mode, sandboxed iframe).
   */
  getStoredTheme(): Theme | null {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored && this.isValidTheme(stored) ? stored as Theme : null
    } catch {
      return null
    }
  }

  /**
   * Validate a theme string against the allowed values.
   */
  isValidTheme(theme: string): boolean {
    return ['light', 'dark', 'auto'].includes(theme)
  }

  /**
   * Get the current theme from the data-bs-theme attribute. Returns 'light',
   * 'dark', or null if not set.
   */
  getDataBsTheme(): Theme | null {
    const theme = document.documentElement.getAttribute('data-bs-theme')
    return theme === 'light' || theme === 'dark' ? theme : null
  }

  /**
   * Get the user's effective choice: the stored theme, falling back to the OS
   * preference.
   */
  getPreferredTheme(): Theme {
    // First check if a theme is stored in localStorage. If so, return it.

    const stored = this.getStoredTheme()

    if (stored) {
      return stored
    }

    // Next, check if a theme is defined in the markup data-bs-theme attribute
    // of the html tag. This is useful for server-side rendering, where the
    // server can set the theme based on the user's preference or a cookie.

    const dataBsTheme = this.getDataBsTheme()

    if (dataBsTheme) {
      return dataBsTheme
    }

    // Finally, fall back to the OS preference.

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
    document.documentElement.setAttribute('data-bs-theme', resolved)
    document.documentElement.style.colorScheme = resolved
  }

  /**
   * Check the OS preference for dark mode.
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
      const isActive = toggle.getAttribute('data-bs-theme-value') === theme
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
    const theme = this.getPreferredTheme()
    this._applyTheme(theme)
    this._showActiveTheme(theme)
  }
}

/**
 * ----------------------------------------------------------------------------
 * Data API implementation
 * ----------------------------------------------------------------------------
 * Toggle clicks are delegated on `document`, so switcher buttons added after
 * load work and the listener survives Turbo's <body> swaps. The class is
 * stateless — everything lives in localStorage and the DOM.
 */

document.addEventListener('click', event => {
  // Prevent handling clicks when target is not an Element.

  const target = event.target

  if (!(target instanceof Element)) {
    return
  }

  // Try to find a theme toggle button in the event's path. If none is found,
  // do nothing. If a toggle is found, read its data-bs-theme-value and apply
  // it.

  const toggle = target.closest(SELECTOR_TOGGLE)
  const theme = toggle?.getAttribute('data-bs-theme-value') as Theme | null

  if (theme) {
    new ColorMode().setTheme(theme)
  }
})

onDOMContentLoaded(() => {
  // Initialize the color mode on page load. This applies the preferred theme
  // and syncs the UI without persisting anything. The persisted choice is only
  // updated when the user clicks a toggle.

  const colorMode = new ColorMode()
  colorMode.init()

  // Follow the OS while no explicit choice (or "auto") is stored.

  globalThis.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const stored = colorMode.getStoredTheme()
    if (!stored || stored === 'auto') {
      colorMode._applyTheme('auto')
      colorMode._showActiveTheme(stored ?? 'auto')
    }
  }, { signal: getLifecycleSignal() })
})

export default ColorMode
