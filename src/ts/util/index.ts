const domContentLoadedCallbacks: Array<() => void> = []

const onDOMContentLoaded = (callback: () => void): void => {
  if (document.readyState === 'loading') {
    // add listener on the first call when the document is in loading state
    if (!domContentLoadedCallbacks.length) {
      document.addEventListener('DOMContentLoaded', () => {
        for (const callback of domContentLoadedCallbacks) {
          callback()
        }
      })
    }

    domContentLoadedCallbacks.push(callback)
  } else {
    callback()
  }
}

/* SLIDE UP */
const slideUp = (target: HTMLElement, duration = 500) => {
  target.style.transitionProperty = 'height, margin, padding'
  target.style.transitionDuration = `${duration}ms`
  target.style.boxSizing = 'border-box'
  target.style.height = `${target.offsetHeight}px`
  target.style.overflow = 'hidden'

  window.setTimeout(() => {
    target.style.height = '0'
    target.style.paddingTop = '0'
    target.style.paddingBottom = '0'
    target.style.marginTop = '0'
    target.style.marginBottom = '0'
  }, 1)

  window.setTimeout(() => {
    target.style.display = 'none'
    target.style.removeProperty('height')
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

/* SLIDE DOWN */
const slideDown = (target: HTMLElement, duration = 500) => {
  target.style.removeProperty('display')
  let { display } = window.getComputedStyle(target)

  if (display === 'none') {
    display = 'block'
  }

  target.style.display = display
  const height = target.offsetHeight
  target.style.overflow = 'hidden'
  target.style.height = '0'
  target.style.paddingTop = '0'
  target.style.paddingBottom = '0'
  target.style.marginTop = '0'
  target.style.marginBottom = '0'

  window.setTimeout(() => {
    target.style.boxSizing = 'border-box'
    target.style.transitionProperty = 'height, margin, padding'
    target.style.transitionDuration = `${duration}ms`
    target.style.height = `${height}px`
    target.style.removeProperty('padding-top')
    target.style.removeProperty('padding-bottom')
    target.style.removeProperty('margin-top')
    target.style.removeProperty('margin-bottom')
  }, 1)

  window.setTimeout(() => {
    target.style.removeProperty('height')
    target.style.removeProperty('overflow')
    target.style.removeProperty('transition-duration')
    target.style.removeProperty('transition-property')
  }, duration)
}

/* TOGGLE */
const slideToggle = (target: HTMLElement, duration = 500) => {
  if (window.getComputedStyle(target).display === 'none') {
    slideDown(target, duration)
    return
  }

  slideUp(target, duration)
}

export {
  onDOMContentLoaded,
  slideUp,
  slideDown,
  slideToggle
}
