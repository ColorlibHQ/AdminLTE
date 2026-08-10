import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import SidebarSearch from '../../src/ts/sidebar-search'

const buildSidebar = (): void => {
  document.body.innerHTML = `
    <aside class="app-sidebar">
      <div class="sidebar-search">
        <input type="search" id="search" data-lte-toggle="sidebar-search" data-lte-target="#navigation">
        <p data-lte-search-empty hidden>No matching pages.</p>
      </div>
      <div class="sidebar-wrapper">
        <ul class="nav sidebar-menu" id="navigation">
          <li class="nav-header" id="header-main">MAIN</li>
          <li class="nav-item" id="item-dashboard">
            <a href="#" class="nav-link"><p>Dashboard</p></a>
          </li>
          <li class="nav-item" id="item-layout">
            <a href="#" class="nav-link"><p>Layout Options</p></a>
            <ul class="nav nav-treeview">
              <li class="nav-item" id="item-fixed-sidebar">
                <a href="#" class="nav-link"><p>Fixed Sidebar</p></a>
              </li>
              <li class="nav-item" id="item-top-nav">
                <a href="#" class="nav-link"><p>Top Navigation</p></a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </aside>
  `
}

const el = (id: string): HTMLElement => document.querySelector(`#${id}`) as HTMLElement
const input = (): HTMLInputElement => el('search') as HTMLInputElement

describe('SidebarSearch', () => {
  beforeEach(() => {
    buildSidebar()
  })

  afterEach(() => {
    document.body.replaceChildren()
  })

  it('hides entries that do not match and keeps the ones that do', () => {
    new SidebarSearch(input()).search('dash')

    expect(el('item-dashboard').hidden).toBe(false)
    expect(el('item-layout').hidden).toBe(true)
    expect(el('item-fixed-sidebar').hidden).toBe(true)
  })

  it('reveals a nested match by keeping and expanding its parent', () => {
    new SidebarSearch(input()).search('top nav')

    expect(el('item-layout').hidden).toBe(false)
    expect(el('item-top-nav').hidden).toBe(false)
    expect(el('item-fixed-sidebar').hidden).toBe(true)

    expect(el('item-layout').classList.contains('menu-open')).toBe(true)
    expect(el('item-layout').querySelector(':scope > .nav-link')?.getAttribute('aria-expanded')).toBe('true')
  })

  it('keeps the whole subtree when the group name itself matches', () => {
    new SidebarSearch(input()).search('layout')

    expect(el('item-layout').hidden).toBe(false)
    expect(el('item-fixed-sidebar').hidden).toBe(false)
    expect(el('item-top-nav').hidden).toBe(false)
  })

  it('hides section headings while filtering and brings them back on clear', () => {
    const search = new SidebarSearch(input())

    search.search('dash')
    expect(el('header-main').hidden).toBe(true)

    search.clear()
    expect(el('header-main').hidden).toBe(false)
  })

  it('restores the pre-search submenu state rather than leaving it expanded', () => {
    // The submenu starts closed, the way Treeview leaves one it slid shut.
    const submenu = el('item-layout').querySelector('.nav-treeview') as HTMLElement
    submenu.style.display = 'none'

    const search = new SidebarSearch(input())
    search.search('top nav')
    expect(el('item-layout').classList.contains('menu-open')).toBe(true)

    search.clear()
    expect(el('item-layout').classList.contains('menu-open')).toBe(false)
    expect(submenu.style.display).toBe('none')
  })

  it('leaves an already-open submenu open after clearing', () => {
    const layout = el('item-layout')
    const submenu = layout.querySelector('.nav-treeview') as HTMLElement
    layout.classList.add('menu-open')
    submenu.style.display = 'block'

    const search = new SidebarSearch(input())
    search.search('dashboard')
    search.clear()

    expect(layout.classList.contains('menu-open')).toBe(true)
    expect(submenu.style.display).toBe('block')
  })

  it('toggles the empty state and reports the match count', () => {
    const search = new SidebarSearch(input())
    const filtered = vi.fn()
    input().addEventListener('filtered.lte.sidebar-search', filtered)

    search.search('nothing here')
    expect(document.querySelector('[data-lte-search-empty]')?.hasAttribute('hidden')).toBe(false)
    expect(filtered.mock.calls.at(-1)?.[0].detail).toEqual({ query: 'nothing here', matches: 0 })

    search.search('dash')
    expect(document.querySelector('[data-lte-search-empty]')?.hasAttribute('hidden')).toBe(true)
    expect(filtered.mock.calls.at(-1)?.[0].detail.matches).toBeGreaterThan(0)
  })

  it('restores the menu when the field is emptied', () => {
    const search = new SidebarSearch(input())

    search.search('dash')
    search.search(' '.repeat(3))

    expect(el('item-layout').hidden).toBe(false)
    expect(el('item-fixed-sidebar').hidden).toBe(false)
    expect(el('header-main').hidden).toBe(false)
  })

  it('filters through the delegated input listener and clears on Escape', () => {
    input().value = 'dash'
    input().dispatchEvent(new Event('input', { bubbles: true }))
    expect(el('item-layout').hidden).toBe(true)

    input().dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape', bubbles: true }))
    expect(input().value).toBe('')
    expect(el('item-layout').hidden).toBe(false)
  })
})
