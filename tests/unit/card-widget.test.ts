import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import CardWidget from '../../src/ts/card-widget'

const SPEED = 50

const buildCard = (): HTMLElement => {
  document.body.innerHTML = `
    <div class="card">
      <div class="card-header">
        <button type="button" class="btn btn-tool" data-lte-toggle="card-collapse" aria-label="Collapse card">
          <i class="bi bi-dash-lg"></i>
        </button>
        <button type="button" class="btn btn-tool" data-lte-toggle="card-remove" aria-label="Remove card">
          <i class="bi bi-x-lg"></i>
        </button>
      </div>
      <div class="card-body">Body</div>
      <div class="card-footer">Footer</div>
    </div>
  `
  return document.querySelector('.card') as HTMLElement
}

describe('CardWidget', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
    document.body.replaceChildren()
  })

  it('collapse() marks the card collapsed after the animation and fires collapsed', () => {
    const card = buildCard()
    const widget = new CardWidget(card, { animationSpeed: SPEED })
    const collapsed = vi.fn()
    card.addEventListener('collapsed.lte.card-widget', collapsed)

    widget.collapse()
    expect(card.classList.contains('collapsing-card')).toBe(true)
    expect(collapsed).not.toHaveBeenCalled()

    vi.advanceTimersByTime(SPEED + 10)
    expect(card.classList.contains('collapsed-card')).toBe(true)
    expect(card.classList.contains('collapsing-card')).toBe(false)
    expect(collapsed).toHaveBeenCalledTimes(1)
  })

  it('a cancelable collapse event can veto the action', () => {
    const card = buildCard()
    const widget = new CardWidget(card, { animationSpeed: SPEED })
    card.addEventListener('collapse.lte.card-widget', event => {
      event.preventDefault()
    }, { once: true })

    widget.collapse()
    vi.advanceTimersByTime(SPEED + 10)
    expect(card.classList.contains('collapsed-card')).toBe(false)
  })

  it('toggling during the collapse animation reverses it cleanly', () => {
    const card = buildCard()
    const widget = new CardWidget(card, { animationSpeed: SPEED })

    widget.toggle() // start collapse
    vi.advanceTimersByTime(SPEED / 2)
    widget.toggle() // mid-animation: must expand, not be swallowed
    vi.advanceTimersByTime(SPEED * 2)

    expect(card.classList.contains('collapsed-card')).toBe(false)
    expect(card.classList.contains('collapsing-card')).toBe(false)
    expect(card.classList.contains('expanding-card')).toBe(false)
  })

  it('remove() fires removed, detaches the card and disposes the instance', () => {
    const card = buildCard()
    const widget = new CardWidget(card, { animationSpeed: SPEED })
    const removed = vi.fn()
    document.addEventListener('removed.lte.card-widget', removed, { once: true })

    widget.remove()
    expect(card.isConnected).toBe(true)

    vi.advanceTimersByTime(SPEED + 10)
    expect(card.isConnected).toBe(false)
    expect(removed).toHaveBeenCalledTimes(1)
    expect(CardWidget.getInstance(card)).toBeNull()
  })

  it('a second remove click during the animation does not remove the card twice', () => {
    const card = buildCard()
    const button = card.querySelector('[data-lte-toggle="card-remove"]') as HTMLElement
    const remove = vi.fn()
    const removed = vi.fn()
    document.addEventListener('remove.lte.card-widget', remove)
    card.addEventListener('removed.lte.card-widget', removed)

    button.click()
    vi.advanceTimersByTime(100)
    button.click()
    vi.advanceTimersByTime(1000)
    document.removeEventListener('remove.lte.card-widget', remove)

    expect(card.isConnected).toBe(false)
    expect(remove).toHaveBeenCalledTimes(1)
    expect(removed).toHaveBeenCalledTimes(1)
  })

  it('data-api: clicking the tool button (or its icon) works via delegation', () => {
    const card = buildCard()
    const icon = card.querySelector('[data-lte-toggle="card-collapse"] i') as HTMLElement

    icon.dispatchEvent(new MouseEvent('click', { bubbles: true }))
    expect(card.classList.contains('collapsing-card')).toBe(true)

    // The delegated handler created and registered an instance on the card.
    expect(CardWidget.getInstance(card)).not.toBeNull()
  })

  it('getOrCreateInstance reuses the existing instance', () => {
    const card = buildCard()
    const first = CardWidget.getOrCreateInstance(card, { animationSpeed: SPEED })
    const second = CardWidget.getOrCreateInstance(card)

    expect(second).toBe(first)
  })
})
