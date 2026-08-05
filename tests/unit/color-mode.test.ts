import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import ColorMode from '../../src/ts/color-mode'

const buildToggles = (): void => {
  document.body.innerHTML = `
    <i class="bi bi-sun-fill" data-lte-theme-icon="light"></i>
    <i class="bi bi-moon-fill d-none" data-lte-theme-icon="dark"></i>
    <button type="button" data-bs-theme-value="light" aria-pressed="false">
      Light <i class="bi bi-check-lg d-none"></i>
    </button>
    <button type="button" data-bs-theme-value="dark" aria-pressed="false">
      Dark <i class="bi bi-check-lg d-none"></i>
    </button>
  `
}

const currentTheme = (): string | null =>
  document.documentElement.getAttribute('data-bs-theme')

describe('ColorMode', () => {
  afterEach(() => {
    document.body.replaceChildren()
    localStorage.clear()
    document.documentElement.removeAttribute('data-bs-theme')
  })

  it('setTheme applies, persists and announces the theme', () => {
    buildToggles()
    let detail: unknown
    document.addEventListener('changed.lte.color-mode', event => {
      detail = (event as CustomEvent).detail
    }, { once: true })

    new ColorMode().setTheme('dark')

    expect(currentTheme()).toBe('dark')
    expect(localStorage.getItem('lte-theme')).toBe('dark')
    expect(detail).toEqual({ theme: 'dark', resolved: 'dark' })
  })

  it('setTheme syncs toggle state and indicator icons', () => {
    buildToggles()
    new ColorMode().setTheme('dark')

    const darkToggle = document.querySelector('[data-bs-theme-value="dark"]') as HTMLElement
    const lightToggle = document.querySelector('[data-bs-theme-value="light"]') as HTMLElement

    expect(darkToggle.classList.contains('active')).toBe(true)
    expect(darkToggle.getAttribute('aria-pressed')).toBe('true')
    expect(darkToggle.querySelector('.bi-check-lg')?.classList.contains('d-none')).toBe(false)
    expect(lightToggle.getAttribute('aria-pressed')).toBe('false')
    expect(document.querySelector('[data-lte-theme-icon="dark"]')?.classList.contains('d-none')).toBe(false)
    expect(document.querySelector('[data-lte-theme-icon="light"]')?.classList.contains('d-none')).toBe(true)
  })

  it('ignores garbage in localStorage', () => {
    localStorage.setItem('lte-theme', 'purple')
    expect(new ColorMode().getStoredTheme()).toBeNull()
  })

  it('data-api: clicking a toggle applies the theme via delegation', () => {
    buildToggles()
    const darkToggle = document.querySelector('[data-bs-theme-value="dark"]') as HTMLElement
    darkToggle.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(currentTheme()).toBe('dark')
    expect(localStorage.getItem('lte-theme')).toBe('dark')
  })
})

/**
 * The remaining suites exercise initialisation, which reads the markup once at
 * module evaluation. Each test therefore sets up <html> first and then loads a
 * fresh copy of the module, the way a browser would.
 */

const osListeners = new Set<() => void>()

// Held on an object so the helpers below can update it without assigning to a
// top-level binding.
const os = { prefersDark: false }

const setOsPreference = (dark: boolean): void => {
  os.prefersDark = dark
  for (const listener of osListeners) {
    listener()
  }
}

const optOut = (): void => {
  document.documentElement.setAttribute('data-lte-color-mode', 'off')
  document.documentElement.setAttribute('data-bs-theme', 'myapp-dark')
}

const loadColorMode = async (): Promise<typeof ColorMode> => {
  // Drop the listener registered by a previously loaded copy, so only the
  // copy under test reacts to setOsPreference().
  osListeners.clear()
  vi.resetModules()
  const module = await import('../../src/ts/color-mode')
  return module.default
}

beforeEach(() => {
  os.prefersDark = false
  vi.stubGlobal('matchMedia', (query: string) => ({
    media: query,
    get matches() {
      return os.prefersDark
    },
    addEventListener(_type: string, listener: () => void) {
      osListeners.add(listener)
    },
    removeEventListener(_type: string, listener: () => void) {
      osListeners.delete(listener)
    }
  }))
})

afterEach(() => {
  vi.unstubAllGlobals()
  osListeners.clear()
  localStorage.clear()
  document.body.replaceChildren()
  document.documentElement.removeAttribute('data-bs-theme')
  document.documentElement.removeAttribute('data-lte-theme-resolved')
  document.documentElement.removeAttribute('data-lte-color-mode')
  document.documentElement.removeAttribute('style')
})

describe('ColorMode theme precedence', () => {
  it('prefers the stored choice over a theme declared in the markup', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'light')
    localStorage.setItem('lte-theme', 'dark')

    await loadColorMode()

    expect(currentTheme()).toBe('dark')
  })

  it('keeps a theme declared in the markup when nothing is stored', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')

    await loadColorMode()

    expect(currentTheme()).toBe('dark')
  })

  it('ignores a value the pre-paint snippet resolved itself', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')
    document.documentElement.setAttribute('data-lte-theme-resolved', '')

    await loadColorMode()

    expect(currentTheme()).toBe('light')
  })

  it('falls back to the OS preference when nothing is stored or declared', async () => {
    setOsPreference(true)

    await loadColorMode()

    expect(currentTheme()).toBe('dark')
  })

  it('ignores a custom theme name in the markup', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'myapp-dark')

    const LoadedColorMode = await loadColorMode()

    // Custom Bootstrap themes cannot be resolved, so they are not a preference
    // ColorMode can honour — opting out is the documented answer for those.
    expect(new LoadedColorMode().getMarkupTheme()).toBeNull()
    expect(currentTheme()).toBe('light')
  })
})

describe('ColorMode OS preference changes', () => {
  it('follows the OS while nothing is stored or declared', async () => {
    await loadColorMode()
    expect(currentTheme()).toBe('light')

    setOsPreference(true)

    expect(currentTheme()).toBe('dark')
  })

  it('follows the OS while the visitor is on "auto"', async () => {
    localStorage.setItem('lte-theme', 'auto')

    await loadColorMode()
    setOsPreference(true)

    expect(currentTheme()).toBe('dark')
  })

  it('keeps a theme declared in the markup across an OS change', async () => {
    document.documentElement.setAttribute('data-bs-theme', 'dark')

    await loadColorMode()
    setOsPreference(true)
    setOsPreference(false)

    expect(currentTheme()).toBe('dark')
  })

  it('keeps the stored choice across an OS change', async () => {
    localStorage.setItem('lte-theme', 'light')

    await loadColorMode()
    setOsPreference(true)

    expect(currentTheme()).toBe('light')
  })
})

describe('ColorMode opt-out', () => {
  it('never applies a theme on init', async () => {
    optOut()
    setOsPreference(true)

    await loadColorMode()

    expect(currentTheme()).toBe('myapp-dark')
    expect(document.documentElement.style.colorScheme).toBe('')
  })

  it('ignores OS preference changes', async () => {
    optOut()

    await loadColorMode()
    setOsPreference(true)

    expect(currentTheme()).toBe('myapp-dark')
  })

  it('ignores toggle clicks', async () => {
    optOut()
    await loadColorMode()
    buildToggles()

    const darkToggle = document.querySelector('[data-bs-theme-value="dark"]') as HTMLElement
    darkToggle.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(currentTheme()).toBe('myapp-dark')
    expect(localStorage.getItem('lte-theme')).toBeNull()
  })

  it('ignores an unknown value on a toggle', async () => {
    await loadColorMode()
    document.body.innerHTML = '<button type="button" data-bs-theme-value="purple">Purple</button>'

    const toggle = document.querySelector('[data-bs-theme-value="purple"]') as HTMLElement
    toggle.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(localStorage.getItem('lte-theme')).toBeNull()
  })
})
