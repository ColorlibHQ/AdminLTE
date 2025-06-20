/**
 * AdminLTE Accessibility Module
 * WCAG 2.1 AA Compliance Features
 */

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
    const main = document.querySelector('#main, main, [role="main"]')
    if (main && !main.id) {
      main.id = 'main'
    }
    if (main && !main.hasAttribute('tabindex')) {
      main.setAttribute('tabindex', '-1')
    }

    const nav = document.querySelector('#navigation, nav, [role="navigation"]')
    if (nav && !nav.id) {
      nav.id = 'navigation'
    }
    if (nav && !nav.hasAttribute('tabindex')) {
      nav.setAttribute('tabindex', '-1')
    }
  }

  // WCAG 2.4.3: Focus Order & 2.4.7: Focus Visible
  private initFocusManagement(): void {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Tab') {
        this.handleTabNavigation(event)
      }
      if (event.key === 'Escape') {
        this.handleEscapeKey(event)
      }
    })

    // Focus management for modals and dropdowns
    this.initModalFocusManagement()
    this.initDropdownFocusManagement()
  }

  private handleTabNavigation(event: KeyboardEvent): void {
    const focusableElements = this.getFocusableElements()
    const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)
    
    if (event.shiftKey) {
      // Shift+Tab (backward)
      if (currentIndex <= 0) {
        event.preventDefault()
        focusableElements.at(-1)?.focus()
      }
    } else if (currentIndex >= focusableElements.length - 1) {
      // Tab (forward)
      event.preventDefault()
      focusableElements[0]?.focus()
    }
  }

  private getFocusableElements(): HTMLElement[] {
    const selector = [
      'a[href]',
      'button:not([disabled])',
      'input:not([disabled])',
      'select:not([disabled])',
      'textarea:not([disabled])',
      '[tabindex]:not([tabindex="-1"])',
      '[contenteditable="true"]'
    ].join(', ')

    return Array.from(document.querySelectorAll(selector)) as HTMLElement[]
  }

  private handleEscapeKey(event: KeyboardEvent): void {
    // Close modals, dropdowns, etc.
    const activeModal = document.querySelector('.modal.show')
    const activeDropdown = document.querySelector('.dropdown-menu.show')
    
    if (activeModal) {
      const closeButton = activeModal.querySelector('[data-bs-dismiss="modal"]') as HTMLElement
      closeButton?.click()
      event.preventDefault()
    } else if (activeDropdown) {
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
      
      // Handle arrow key navigation for menus
      if (target.closest('.nav, .navbar-nav, .dropdown-menu')) {
        this.handleMenuNavigation(event)
      }
      
      // Handle Enter and Space for custom buttons
      if ((event.key === 'Enter' || event.key === ' ') && target.hasAttribute('role') && target.getAttribute('role') === 'button' && !target.matches('button, input[type="button"], input[type="submit"]')) {
        event.preventDefault()
        target.click()
      }
    })
  }

  private handleMenuNavigation(event: KeyboardEvent): void {
    if (!['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
      return
    }

    const currentElement = event.target as HTMLElement
    const menuItems = Array.from(currentElement.closest('.nav, .navbar-nav, .dropdown-menu')?.querySelectorAll('a, button') || []) as HTMLElement[]
    const currentIndex = menuItems.indexOf(currentElement)
    
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
      
      // Reduce animation duration
      const style = document.createElement('style')
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

      // Handle invalid states
      htmlInput.addEventListener('invalid', () => {
        this.handleFormError(htmlInput)
      })
    })
  }

  private handleFormError(input: HTMLInputElement): void {
    const errorId = `${input.id || input.name}-error`
    let errorElement = document.getElementById(errorId)
    
    if (!errorElement) {
      errorElement = document.createElement('div')
      errorElement.id = errorId
      errorElement.className = 'invalid-feedback'
      errorElement.setAttribute('role', 'alert')
      input.parentNode?.insertBefore(errorElement, input.nextSibling)
    }
    
    errorElement.textContent = input.validationMessage
    input.setAttribute('aria-describedby', errorId)
    input.classList.add('is-invalid')
    
    this.announce(`Error in ${input.labels?.[0]?.textContent || input.name}: ${input.validationMessage}`, 'assertive')
  }

  // Modal focus management
  private initModalFocusManagement(): void {
    document.addEventListener('shown.bs.modal', (event) => {
      const modal = event.target as HTMLElement
      const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')
      
      if (focusableElements.length > 0) {
        (focusableElements[0] as HTMLElement).focus()
      }
      
      // Store previous focus
      this.focusHistory.push(document.activeElement as HTMLElement)
    })

    document.addEventListener('hidden.bs.modal', () => {
      // Restore previous focus
      const previousElement = this.focusHistory.pop()
      if (previousElement) {
        previousElement.focus()
      }
    })
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
    })
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
    })
  }

  public addLandmarks(): void {
    // Add main landmark if missing
    const main = document.querySelector('main')
    if (!main) {
      const appMain = document.querySelector('.app-main')
      if (appMain) {
        appMain.setAttribute('role', 'main')
        appMain.id = 'main'
      }
    }

    // Add navigation landmarks
    document.querySelectorAll('.navbar-nav, .nav').forEach((nav, index) => {
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

// Utility function for luminance calculation
const getLuminance = (color: string): number => {
  const rgb = color.match(/\d+/g)?.map(Number) || [0, 0, 0]
  const [r, g, b] = rgb.map(c => {
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