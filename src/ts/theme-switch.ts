/**
 * --------------------------------------------
 * @file AdminLTE theme-switch.ts
 * @description Dark/light theme toggle for AdminLTE.
 * Persists user preference in localStorage and
 * respects the OS-level prefers-color-scheme setting.
 * @license MIT
 * --------------------------------------------
 */

import {
  onDOMContentLoaded
} from './util/index'

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

const DATA_KEY = 'lte.theme-switch'
const EVENT_KEY = `.${DATA_KEY}`

const EVENT_THEME_CHANGE = `change${EVENT_KEY}`

const THEME_LIGHT = 'light'
const THEME_DARK = 'dark'

const STORAGE_KEY_THEME = 'lte.theme'
const SELECTOR_THEME_TOGGLE = '[data-lte-toggle="theme"]'

type Theme = typeof THEME_LIGHT | typeof THEME_DARK

type Config = {
  defaultTheme: Theme;
  enablePersistence: boolean;
  respectSystemPreference: boolean;
}

const Defaults: Config = {
  defaultTheme: THEME_LIGHT,
  enablePersistence: true,
  respectSystemPreference: true
}

/**
 * Class Definition
 * ====================================================
 */

class ThemeSwitch {
  _element: HTMLElement
  _config: Config
  _currentTheme: Theme

  constructor(element: HTMLElement, config?: Partial<Config>) {
    this._element = element
    this._config = { ...Defaults, ...config }
    this._currentTheme = this._resolveInitialTheme()
  }

  get theme(): Theme {
    return this._currentTheme
  }

  /**
   * Determine initial theme from: localStorage > system preference > default
   */
  private _resolveInitialTheme(): Theme {
    if (this._config.enablePersistence) {
      try {
        const stored = localStorage.getItem(STORAGE_KEY_THEME)
        if (stored === THEME_DARK || stored === THEME_LIGHT) {
          return stored
        }
      } catch {
        // localStorage unavailable
      }
    }

    if (this._config.respectSystemPreference) {
      const prefersDark = globalThis.matchMedia?.('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        return THEME_DARK
      }
    }

    return this._config.defaultTheme
  }

  apply(): void {
    document.documentElement.setAttribute('data-bs-theme', this._currentTheme)
    this._updateToggles()
    this._persist()
  }

  toggle(): void {
    this.setTheme(this._currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK)
  }

  setTheme(theme: Theme): void {
    this._currentTheme = theme
    this.apply()

    const event = new CustomEvent(EVENT_THEME_CHANGE, { detail: { theme } })
    this._element.dispatchEvent(event)
  }

  private _persist(): void {
    if (!this._config.enablePersistence) {
      return
    }

    try {
      localStorage.setItem(STORAGE_KEY_THEME, this._currentTheme)
    } catch {
      // localStorage unavailable
    }
  }

  private _updateToggles(): void {
    const toggles = document.querySelectorAll<HTMLElement>(SELECTOR_THEME_TOGGLE)
    const isDark = this._currentTheme === THEME_DARK

    toggles.forEach(toggle => {
      // Update aria attribute for accessibility
      toggle.setAttribute('aria-pressed', String(isDark))

      // Update checkbox/input toggles
      if (toggle instanceof HTMLInputElement && toggle.type === 'checkbox') {
        toggle.checked = isDark
      }
    })
  }

  /**
   * Listen for OS theme changes and react accordingly
   */
  watchSystemPreference(): void {
    if (!this._config.respectSystemPreference) {
      return
    }

    globalThis.matchMedia?.('(prefers-color-scheme: dark)').addEventListener('change', event => {
      // Only auto-switch if user hasn't manually chosen a theme
      if (!this._config.enablePersistence) {
        this.setTheme(event.matches ? THEME_DARK : THEME_LIGHT)
        return
      }

      try {
        const stored = localStorage.getItem(STORAGE_KEY_THEME)
        if (!stored) {
          this.setTheme(event.matches ? THEME_DARK : THEME_LIGHT)
        }
      } catch {
        this.setTheme(event.matches ? THEME_DARK : THEME_LIGHT)
      }
    })
  }
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

onDOMContentLoaded(() => {
  const themeSwitch = new ThemeSwitch(document.documentElement)
  themeSwitch.apply()
  themeSwitch.watchSystemPreference()

  const toggles = document.querySelectorAll(SELECTOR_THEME_TOGGLE)
  toggles.forEach(toggle => {
    toggle.addEventListener('click', event => {
      event.preventDefault()
      themeSwitch.toggle()
    })
  })
})

export default ThemeSwitch
