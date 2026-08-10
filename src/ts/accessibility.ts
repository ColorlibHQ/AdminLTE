/**
 * AdminLTE Accessibility Module
 * WCAG 2.1 AA Compliance Features
 */

import { getLifecycleSignal } from './util/index'

export interface AccessibilityConfig {
  announcements: boolean
  skipLinks: boolean
  focusManagement: boolean
  keyboardNavigation: boolean
  reducedMotion: boolean
}

export class AccessibilityManager {
  private config: AccessibilityConfig
  private liveRegion: HTMLElement | null = null
  private focusHistory: HTMLElement[] = []
  // Listeners bound to `document` survive Turbo's <body> swap, so they are
  // registered with this signal and torn down before the next re-init.
  private readonly signal: AbortSignal = getLifecycleSignal()

  constructor(config: Partial<AccessibilityConfig> = {}) {
    this.config = {
      announcements: true,
      skipLinks: true,
      focusManagement: true,
      keyboardNavigation: true,
      reducedMotion: true,
      ...config
    }

    this.init()
  }

  private init(): void {
    if (this.config.announcements) {
      this.createLiveRegion()
    }

    if (this.config.skipLinks) {
      this.addSkipLinks()
    }

    if (this.config.focusManagement) {
      this.initFocusManagement()
    }

    if (this.config.keyboardNavigation) {
      this.initKeyboardNavigation()
    }

    if (this.config.reducedMotion) {
      this.respectReducedMotion()
    }

    this.initErrorAnnouncements()
    this.initTableAccessibility()
    this.initFormAccessibility()
  }

  // WCAG 4.1.3: Status Messages
  private createLiveRegion(): void {
    if (this.liveRegion) return

    // Adopt an existing region instead of appending a duplicate: Turbo caches
    // the <body> including JS-injected nodes, so a region created before a
    // navigation is restored along with the snapshot.
    const existingRegion = document.getElementById('live-region')
    if (existingRegion) {
      this.liveRegion = existingRegion
      return
    }

    this.liveRegion = document.createElement('div')
    this.liveRegion.id = 'live-region'
    this.liveRegion.className = 'live-region'
    this.liveRegion.setAttribute('aria-live', 'polite')
    this.liveRegion.setAttribute('aria-atomic', 'true')
    this.liveRegion.setAttribute('role', 'status')

    document.body.append(this.liveRegion)
  }

  // WCAG 2.4.1: Bypass Blocks
  private addSkipLinks(): void {
    // Same Turbo snapshot concern as createLiveRegion: skip links restored
    // with a cached <body> must not be injected a second time.
    if (document.querySelector('.skip-links')) {
      this.ensureSkipTargets()
      return
    }

    const skipLinksContainer = document.createElement('div')
    skipLinksContainer.className = 'skip-links'
    
    const skipToMain = document.createElement('a')
    skipToMain.href = '#main'
    skipToMain.className = 'skip-link'
    skipToMain.textContent = 'Skip to main content'
    
    const skipToNav = document.createElement('a')
    skipToNav.href = '#navigation'
    skipToNav.className = 'skip-link'
    skipToNav.textContent = 'Skip to navigation'

    skipLinksContainer.append(skipToMain)
    skipLinksContainer.append(skipToNav)
    
    document.body.insertBefore(skipLinksContainer, document.body.firstChild)

    // Ensure targets exist and are focusable
    this.ensureSkipTargets()
  }

  private ensureSkipTargets(): void {
    // An element the page already gave the id to always wins. This used to be
    // one querySelector over `#navigation, nav, [role="navigation"]`, but a
    // selector list returns the first match in *document order* rather than
    // the first selector that matched — so a page whose sidebar menu carried
    // `id="navigation"` had the id stamped a second time onto the header
    // <nav> that precedes it, leaving a duplicate id and pointing both the
    // skip link and any `#navigation` lookup at the wrong element.
    const targets: Array<[string, string]> = [
      ['main', 'main, [role="main"]'],
      ['navigation', 'nav, [role="navigation"]']
    ]

    for (const [id, fallbackSelector] of targets) {
      const target = document.getElementById(id) ?? document.querySelector(fallbackSelector)

      if (!target) {
        continue
      }

      if (!target.id) {
        target.id = id
      }

      if (!target.hasAttribute('tabindex')) {
        target.setAttribute('tabindex', '-1')
      }
    }
  }

  // WCAG 2.4.3: Focus Order & 2.4.7: Focus Visible
  private initFocusManagement(): void {
    // Note: focus must never be wrapped at the document edges — trapping Tab
    // inside the page prevents keyboard users from reaching browser chrome
    // and is itself a WCAG 2.1.2 (No Keyboard Trap) failure. Focus trapping
    // is only legitimate inside active modal dialogs, which Bootstrap already
    // handles.
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.handleEscapeKey(event)
      }
    }, { signal: this.signal })

    // Focus management for modals and dropdowns
    this.initModalFocusManagement()
    this.initDropdownFocusManagement()
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    // Close dropdowns, but let Bootstrap handle its own modal keyboard behavior
    const activeModal = document.querySelector('.modal.show')

    if (activeModal) {
      // Do not interfere — Bootstrap handles Escape for modals,
      // including respecting keyboard: false and stacked modals
      return
    }

    const activeDropdown = document.querySelector('.dropdown-menu.show')
    if (activeDropdown) {
      const toggleButton = document.querySelector('[data-bs-toggle="dropdown"][aria-expanded="true"]') as HTMLElement
      toggleButton?.click()
      event.preventDefault()
    }
  }

  // WCAG 2.1.1: Keyboard Access
  private initKeyboardNavigation(): void {
    // Add keyboard support for custom components
    document.addEventListener('keydown', (event) => {
      const target = event.target as HTMLElement

      // Never intercept keys inside editable controls: arrow keys must keep
      // moving the caret in e.g. a navbar search input.
      if (target.matches('input, textarea, select, [contenteditable], [contenteditable] *')) {
        return
      }

      // Handle arrow key navigation for menus
      if (target.closest('.nav, .navbar-nav, .dropdown-menu')) {
        this.handleMenuNavigation(event)
      }

      // Handle Enter and Space for custom buttons
      if ((event.key === 'Enter' || event.key === ' ') && target.hasAttribute('role') && target.getAttribute('role') === 'button' && !target.matches('button, input[type="button"], input[type="submit"]')) {
        event.preventDefault()
        target.click()
      }
    }, { signal: this.signal })
  }

  private handleMenuNavigation(event: KeyboardEvent): void {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return
    }

    const currentElement = event.target as HTMLElement
    const menuItems = (Array.from(currentElement.closest('.nav, .navbar-nav, .dropdown-menu')?.querySelectorAll('a, button') || []) as HTMLElement[])
      // Skip items hidden inside collapsed submenus or closed dropdowns.
      .filter(item => item.offsetParent !== null)
    const currentIndex = menuItems.indexOf(currentElement)

    // Only take over navigation when focus is actually on a menu item;
    // otherwise stealing the arrow keys would yank focus out of unrelated
    // controls that merely sit inside a nav container.
    if (currentIndex === -1) {
      return
    }

    let nextIndex: number
    
    switch (event.key) {
      case 'ArrowDown':
      case 'ArrowRight': {
        nextIndex = currentIndex < menuItems.length - 1 ? currentIndex + 1 : 0
        break
      }
      case 'ArrowUp':
      case 'ArrowLeft': {
        nextIndex = currentIndex > 0 ? currentIndex - 1 : menuItems.length - 1
        break
      }
      case 'Home': {
        nextIndex = 0
        break
      }
      case 'End': {
        nextIndex = menuItems.length - 1
        break
      }
      default: {
        return
      }
    }
    
    event.preventDefault()
    menuItems[nextIndex]?.focus()
  }

  // WCAG 2.3.3: Animation from Interactions
  private respectReducedMotion(): void {
    const prefersReducedMotion = globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches
    
    if (prefersReducedMotion) {
      document.body.classList.add('reduce-motion')
      
      // Disable smooth scrolling
      document.documentElement.style.scrollBehavior = 'auto'
      
      // Reduce animation duration. The <head> survives Turbo navigations, so
      // only inject the override stylesheet once to avoid stacking duplicates.
      if (!document.getElementById('adminlte-reduce-motion')) {
        const style = document.createElement('style')
        style.id = 'adminlte-reduce-motion'
        style.textContent = `
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        `
        document.head.append(style)
      }
    }
  }

  // WCAG 3.3.1: Error Identification
  private initErrorAnnouncements(): void {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            const element = node as Element
            
            // Check for error messages
            if (element.matches('.alert-danger, .invalid-feedback, .error')) {
              this.announce(element.textContent || 'Error occurred', 'assertive')
            }
            
            // Check for success messages
            if (element.matches('.alert-success, .success')) {
              this.announce(element.textContent || 'Success', 'polite')
            }
          }
        })
      })
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true
    })

    // Stop observing the old <body> before Turbo swaps in a new one.
    this.signal.addEventListener('abort', () => {
      observer.disconnect()
    }, { once: true })
  }

  // WCAG 1.3.1: Info and Relationships
  private initTableAccessibility(): void {
    document.querySelectorAll('table').forEach((table) => {
      // Add table role if missing
      if (!table.hasAttribute('role')) {
        table.setAttribute('role', 'table')
      }

      // Ensure headers have proper scope
      table.querySelectorAll('th').forEach((th) => {
        if (!th.hasAttribute('scope')) {
          const isInThead = th.closest('thead')
          const isFirstColumn = th.cellIndex === 0
          
          if (isInThead) {
            th.setAttribute('scope', 'col')
          } else if (isFirstColumn) {
            th.setAttribute('scope', 'row')
          }
        }
      })

      // Add caption if missing but title exists
      if (!table.querySelector('caption') && table.hasAttribute('title')) {
        const caption = document.createElement('caption')
        caption.textContent = table.getAttribute('title') || ''
        table.insertBefore(caption, table.firstChild)
      }
    })
  }

  // WCAG 3.3.2: Labels or Instructions
  private initFormAccessibility(): void {
    document.querySelectorAll('input, select, textarea').forEach((input) => {
      const htmlInput = input as HTMLInputElement
      
      // Ensure all inputs have labels
      if (!htmlInput.labels?.length && !htmlInput.hasAttribute('aria-label') && !htmlInput.hasAttribute('aria-labelledby')) {
        const placeholder = htmlInput.getAttribute('placeholder')
        if (placeholder) {
          htmlInput.setAttribute('aria-label', placeholder)
        }
      }

      // Add required indicators
      if (htmlInput.hasAttribute('required')) {
        const label = htmlInput.labels?.[0]
        if (label && !label.querySelector('.required-indicator')) {
          const indicator = document.createElement('span')
          indicator.className = 'required-indicator sr-only'
          indicator.textContent = ' (required)'
          label.append(indicator)
        }
      }

      // Handle invalid state unless the element explicitly opts out via the
      // 'disable-adminlte-validations' class. Registered with the lifecycle
      // signal: this runs once per cycle, and under a framework that
      // re-initialises against a persistent <body> (initialize()) the inputs
      // survive the cycle — an unsignalled listener would stack one handler
      // per re-init on every field.
      if (!htmlInput.classList.contains('disable-adminlte-validations')) {
        htmlInput.addEventListener('invalid', () => {
          this.handleFormError(htmlInput)
        }, { signal: this.signal })
      }
    })
  }

  private handleFormError(input: HTMLInputElement): void {
    // Inputs lacking both an id and a name would otherwise collide on a
    // single "-error" id. Assign a stable generated id once and persist it on
    // the element so repeated `invalid` events reuse the same error node
    // instead of appending a new orphaned one each time.
    if (!input.id && !input.name) {
      input.id = accessibilityUtils.generateId('field')
    }

    const errorId = `${input.id || input.name}-error`
    let errorElement = document.getElementById(errorId)
    
    if (!errorElement) {
      errorElement = document.createElement('div')
      errorElement.id = errorId
      errorElement.className = 'invalid-feedback'
      errorElement.setAttribute('role', 'alert')

      // Always append the error element as the last child of the parent.
      // This prevents breaking layouts where inputs use Bootstrap's
      // `.input-group-text` decorators, ensuring the error stays below
      // the entire input group.
      input.parentNode?.append(errorElement)
    }
    
    errorElement.textContent = input.validationMessage
    // Append to any existing aria-describedby (e.g. help text) instead of
    // clobbering it.
    const describedBy = (input.getAttribute('aria-describedby') || '').split(/\s+/).filter(Boolean)
    if (!describedBy.includes(errorId)) {
      describedBy.push(errorId)
    }

    input.setAttribute('aria-describedby', describedBy.join(' '))
    input.classList.add('is-invalid')
    
    this.announce(`Error in ${input.labels?.[0]?.textContent || input.name}: ${input.validationMessage}`, 'assertive')
  }

  // Modal focus management
  private initModalFocusManagement(): void {
    // Capture the trigger on `show` — before Bootstrap (or the `shown`
    // handler below) moves focus into the modal. Capturing on `shown` would
    // store an element inside the modal itself, so closing it would "restore"
    // focus to a now-hidden node and drop focus to <body>.
    document.addEventListener('show.bs.modal', () => {
      this.focusHistory.push(document.activeElement as HTMLElement)
    }, { signal: this.signal })

    document.addEventListener('shown.bs.modal', (event) => {
      const modal = event.target as HTMLElement
      // Respect an explicit [autofocus] before falling back to the first
      // focusable control.
      const autofocusElement = modal.querySelector('[autofocus]') as HTMLElement | null
      const firstFocusable = autofocusElement ||
        (modal.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])') as HTMLElement | null)

      firstFocusable?.focus()
    }, { signal: this.signal })

    document.addEventListener('hidden.bs.modal', () => {
      // Restore previous focus, unless the trigger has since been removed
      // from the document (e.g. a delete-confirmation modal removing its row).
      const previousElement = this.focusHistory.pop()
      if (previousElement?.isConnected) {
        previousElement.focus()
      }
    }, { signal: this.signal })
  }

  // Dropdown focus management
  private initDropdownFocusManagement(): void {
    document.addEventListener('shown.bs.dropdown', (event) => {
      const dropdown = event.target as HTMLElement
      const menu = dropdown.querySelector('.dropdown-menu')
      const firstItem = menu?.querySelector('a, button') as HTMLElement
      
      if (firstItem) {
        firstItem.focus()
      }
    }, { signal: this.signal })
  }

  // Public API methods
  public announce(message: string, priority: 'polite' | 'assertive' = 'polite'): void {
    if (!this.liveRegion) {
      this.createLiveRegion()
    }
    
    if (this.liveRegion) {
      this.liveRegion.setAttribute('aria-live', priority)
      this.liveRegion.textContent = message
      
      // Clear after announcement
      setTimeout(() => {
        if (this.liveRegion) {
          this.liveRegion.textContent = ''
        }
      }, 1000)
    }
  }

  public focusElement(selector: string): void {
    const element = document.querySelector(selector) as HTMLElement
    if (element) {
      element.focus()
      
      // Ensure element is visible
      element.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }

  public trapFocus(container: HTMLElement): void {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>
    
    const focusableArray = Array.from(focusableElements)
    const firstElement = focusableArray[0]
    const lastElement = focusableArray.at(-1)
    
    container.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement?.focus()
            event.preventDefault()
          }
        } else if (document.activeElement === lastElement) {
          firstElement.focus()
          event.preventDefault()
        }
      }
    }, { signal: this.signal })
  }

  public addLandmarks(): void {
    // Add main landmark if missing
    const main = document.querySelector('main')
    if (!main) {
      const appMain = document.querySelector('.app-main')
      if (appMain) {
        appMain.setAttribute('role', 'main')
        if (!appMain.id) {
          appMain.id = 'main'
        }
      }
    }

    // Add navigation landmarks.
    // Skip <ul>/<ol>: assigning role="navigation" to a list element strips its
    // implicit list semantics, orphaning its <li> children for screen readers
    // and failing Lighthouse's "list items not contained within list parent"
    // audit (#6038). Lists that should be navigation landmarks belong inside a
    // <nav> element, which already provides the landmark and accessible name.
    document.querySelectorAll('.navbar-nav, .nav').forEach((nav, index) => {
      if (nav.tagName === 'UL' || nav.tagName === 'OL') {
        return
      }
      if (!nav.hasAttribute('role')) {
        nav.setAttribute('role', 'navigation')
      }
      if (!nav.hasAttribute('aria-label')) {
        nav.setAttribute('aria-label', `Navigation ${index + 1}`)
      }
    })

    // Add search landmark
    const searchForm = document.querySelector('form[role="search"], .navbar-search')
    if (searchForm && !searchForm.hasAttribute('role')) {
      searchForm.setAttribute('role', 'search')
    }
  }
}

// Initialize accessibility when DOM is ready
export const initAccessibility = (config?: Partial<AccessibilityConfig>): AccessibilityManager => {
  return new AccessibilityManager(config)
}

// Parse a CSS color into RGB channels. Supports rgb()/rgba() strings and
// 3- or 6-digit hex notation; anything else falls back to black.
const parseColorChannels = (color: string): number[] => {
  const hexMatch = /^#([\da-f]{3}|[\da-f]{6})$/i.exec(color.trim())
  if (hexMatch) {
    let hex = hexMatch[1]
    if (hex.length === 3) {
      hex = [...hex].map(character => character + character).join('')
    }

    return [
      Number.parseInt(hex.slice(0, 2), 16),
      Number.parseInt(hex.slice(2, 4), 16),
      Number.parseInt(hex.slice(4, 6), 16)
    ]
  }

  return color.match(/\d+/g)?.map(Number) || [0, 0, 0]
}

// Utility function for luminance calculation
const getLuminance = (color: string): number => {
  const [r, g, b] = parseColorChannels(color).map(c => {
    c = c / 255
    return c <= 0.039_28 ? c / 12.92 : (c + 0.055) ** 2.4 / (1.055 ** 2.4)
  })
  return 0.2126 * r + 0.7152 * g + 0.0722 * b
}

// Export utility functions
export const accessibilityUtils = {
  // WCAG 1.4.3: Contrast checking utility
  checkColorContrast: (foreground: string, background: string): { ratio: number; passes: boolean } => {
    const l1 = getLuminance(foreground)
    const l2 = getLuminance(background)
    const ratio = (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
    
    return {
      ratio: Math.round(ratio * 100) / 100,
      passes: ratio >= 4.5
    }
  },

  // Generate unique IDs for accessibility
  generateId: (prefix: string = 'a11y'): string => {
    return `${prefix}-${Math.random().toString(36).slice(2, 11)}`
  },

  // Check if element is focusable
  isFocusable: (element: HTMLElement): boolean => {
    const focusableSelectors = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ]
    
    return focusableSelectors.some(selector => element.matches(selector))
  }
} 