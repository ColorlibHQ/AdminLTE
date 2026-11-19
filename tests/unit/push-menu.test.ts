import { afterEach, describe, expect, it, vi } from 'vitest'
import PushMenu from '../../src/ts/push-menu'

const buildLayout = (): HTMLElement => {
  document.body.className = ''
  document.body.innerHTML = `
    <div class="app-wrapper">
      <aside class="app-sidebar"></aside>
    </div>
  `
  return document.querySelector('.app-sidebar') as HTMLElement
}

describe('PushMenu', () => {
  afterEach(() => {
    document.body.replaceChildren()
    document.body.className = ''
  })

  it('collapse()/expand() drive the body classes and fire after-events', () => {
    const sidebar = buildLayout()
    const menu = new PushMenu(sidebar, {})
    const collapsed = vi.fn()
    const opened = vi.fn()
    sidebar.addEventListener('collapsed.lte.push-menu', collapsed)
    sidebar.addEventListener('opened.lte.push-menu', opened)

    menu.collapse()
    expect(document.body.classList.contains('sidebar-collapse')).toBe(true)
    expect(collapsed).toHaveBeenCalledTimes(1)

    menu.expand()
    expect(document.body.classList.contains('sidebar-collapse')).toBe(false)
    expect(opened).toHaveBeenCalledTimes(1)
  })

  it('cancelable open event keeps the sidebar collapsed', () => {
    const sidebar = buildLayout()
    const menu = new PushMenu(sidebar, {})
    menu.collapse()

    sidebar.addEventListener('open.lte.push-menu', event => {
      event.preventDefault()
    }, { once: true })

    menu.expand()
    expect(document.body.classList.contains('sidebar-collapse')).toBe(true)
  })

  it('a vetoed toggle does not persist the state it did not reach', () => {
    localStorage.clear()
    const sidebar = buildLayout()
    const menu = new PushMenu(sidebar, { enablePersistence: true })

    sidebar.addEventListener('collapse.lte.push-menu', event => {
      event.preventDefault()
    }, { once: true })

    menu.toggle()
    expect(document.body.classList.contains('sidebar-collapse')).toBe(false)

    // The next page load restores whatever was saved.
    new PushMenu(buildLayout(), { enablePersistence: true }).init()
    expect(document.body.classList.contains('sidebar-collapse')).toBe(false)
  })

  it('a vetoed toggle leaves an earlier saved preference untouched', () => {
    // The user chose "expanded" on a desktop-size screen.
    localStorage.setItem('lte.sidebar.state', 'sidebar-open')

    // On a mobile-size screen the sidebar starts collapsed, and a listener
    // vetoes opening it (for example while a modal is shown).
    const sidebar = buildLayout()
    const menu = new PushMenu(sidebar, { enablePersistence: true, sidebarBreakpoint: 99_999 })
    menu.init()
    expect(document.body.classList.contains('sidebar-collapse')).toBe(true)

    sidebar.addEventListener('open.lte.push-menu', event => {
      event.preventDefault()
    }, { once: true })

    menu.toggle()
    expect(document.body.classList.contains('sidebar-collapse')).toBe(true)
    expect(localStorage.getItem('lte.sidebar.state')).toBe('sidebar-open')
  })

  it('an unvetoed toggle persists the state it reached', () => {
    localStorage.clear()
    const sidebar = buildLayout()
    const menu = new PushMenu(sidebar, { enablePersistence: true })

    menu.toggle()
    expect(localStorage.getItem('lte.sidebar.state')).toBe('sidebar-collapse')

    menu.toggle()
    expect(localStorage.getItem('lte.sidebar.state')).toBe('sidebar-open')
  })

  it('is retrievable via getInstance for programmatic control', () => {
    const sidebar = buildLayout()
    const menu = PushMenu.getOrCreateInstance(sidebar, { enablePersistence: false })

    expect(PushMenu.getInstance(sidebar)).toBe(menu)
    expect(PushMenu.getInstance(document.body)).toBeNull()
  })

  it('data-api: a toggle click is delegated to the sidebar instance', () => {
    const sidebar = buildLayout()
    PushMenu.getOrCreateInstance(sidebar, {})
    document.body.insertAdjacentHTML(
      'beforeend',
      '<a href="#" data-lte-toggle="sidebar" role="button"><i class="bi bi-list"></i></a>'
    )

    const icon = document.querySelector('[data-lte-toggle="sidebar"] i') as HTMLElement
    icon.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(document.body.classList.contains('sidebar-collapse')).toBe(true)
  })
})
