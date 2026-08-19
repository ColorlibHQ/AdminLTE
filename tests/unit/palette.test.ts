import { readFileSync } from 'node:fs'
import * as sass from 'sass'
import path from 'node:path'
import process from 'node:process'
import { describe, expect, it } from 'vitest'
// @ts-expect-error — plain ESM module without a declaration file (dev-only helper)
import { bootstrapThemeColors, contrastWhite, hueDistance, palette, paletteV3, sets, skins, skinsV3 } from '../../src/utils/palette.mjs'

const THEME_COLORS = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

/**
 * The extended palette (dist/css/adminlte-colors.css) is generated from OKLCH
 * targets and described in src/utils/palette.mjs; the SCSS map in
 * src/scss/colors/_variables.scss is what actually compiles. These tests keep
 * the two in step and hold the palette to the rules it was designed with.
 * `node scripts/palette.mjs --check` runs the same checks from the CLI.
 */

type PaletteColor = {
  name: string
  hex: string
  textColor: string
  textColorAA: string
  contrastWhite: number
  contrastBlack: number
  role: 'chromatic' | 'neutral'
  oklch: { L: number; C: number; h: number }
}

const colors = palette as PaletteColor[]
const byName = (a: string, b: string) => a.localeCompare(b)

function compileScss(entry: string): string {
  return sass.compile(path.resolve(process.cwd(), entry), {
    loadPaths: ['node_modules'],
    quietDeps: true,
    silenceDeprecations: ['import']
  }).css
}

function readScssPalette(file = 'src/scss/colors/_variables.scss'): Record<string, string> {
  const source = readFileSync(path.resolve(process.cwd(), file), 'utf8')
  const start = source.indexOf('$lte-palette: (')
  const end = source.indexOf(') !default;', start)
  const map: Record<string, string> = {}
  for (const match of source.slice(start, end).matchAll(/"([a-z-]+)":\s*(#[\da-f]{6})/g)) {
    map[match[1]] = match[2]
  }

  return map
}

describe('extended palette', () => {
  it('SCSS map and src/utils/palette.mjs list the same colours', () => {
    const scss = readScssPalette()
    expect(Object.keys(scss).toSorted(byName)).toEqual(colors.map(c => c.name).toSorted(byName))
    for (const c of colors) {
      expect(scss[c.name], c.name).toBe(c.hex)
    }
  })

  it('every colour takes white text at ≥ 4.5:1 (WCAG AA)', () => {
    for (const c of colors) {
      expect(contrastWhite(c.hex), `${c.name} ${c.hex}`).toBeGreaterThanOrEqual(4.5)
    }
  })

  it('chromatic colours sit at the same visual weight as Bootstrap\'s theme colours', () => {
    const chromatic = colors.filter(x => x.role === 'chromatic')
    for (const c of chromatic) {
      expect(c.oklch.L, c.name).toBeGreaterThanOrEqual(0.54)
      expect(c.oklch.L, c.name).toBeLessThanOrEqual(0.6)
    }
  })

  it('chromatic hues stay ≥ 20° apart and ≥ 15° from Bootstrap\'s theme hues', () => {
    const chromatic = colors.filter(x => x.role === 'chromatic')
    const bootstrapChromatic = (bootstrapThemeColors as Array<{ name: string; hue: number; chroma: number }>).filter(t => t.chroma > 0.05)
    for (const [i, a] of chromatic.entries()) {
      const later = chromatic.slice(i + 1)
      for (const b of later) {
        expect(hueDistance(a.oklch.h, b.oklch.h), `${a.name}–${b.name}`).toBeGreaterThanOrEqual(19.5)
      }

      for (const bs of bootstrapChromatic) {
        expect(hueDistance(a.oklch.h, bs.hue), `${a.name}–${bs.name}`).toBeGreaterThanOrEqual(15)
      }
    }
  })

  it('the legacy v3 sheet lists exactly the colours src/utils/palette.mjs describes', () => {
    const scss = readScssPalette('src/scss/adminlte-colors-v3.scss')
    const v3 = paletteV3 as PaletteColor[]
    expect(Object.keys(scss).toSorted(byName)).toEqual(v3.map(c => c.name).toSorted(byName))
    for (const c of v3) {
      expect(scss[c.name], c.name).toBe(c.hex)
    }
  })

  it('v3 skin presets only reference v3 colours', () => {
    const known = new Set((paletteV3 as PaletteColor[]).map(c => c.name))
    for (const skin of skinsV3 as Array<{ name: string; header: { cls: string }; sidebar: { cls: string }; boxes: string[] }>) {
      for (const cls of [skin.header.cls, skin.sidebar.cls]) {
        expect(known.has(cls.replace(/^text-bg-/, '')) || cls.startsWith('bg-body'), `${skin.name} → ${cls}`).toBe(true)
      }

      for (const name of skin.boxes) {
        expect(known.has(name), `${skin.name} → boxes ${name}`).toBe(true)
      }
    }
  })

  it('every skin names a `data-lte-primary` its own palette has', () => {
    for (const [label, list, colors] of [['designed', skins, palette], ['v3', skinsV3, paletteV3]] as Array<[string, Array<{ name: string; primary: string }>, PaletteColor[]]>) {
      const known = new Set([...colors.map(c => c.name), ...THEME_COLORS])
      for (const skin of list) {
        expect(known.has(skin.primary), `${label} → ${skin.name} → ${skin.primary}`).toBe(true)
      }
    }
  })

  it('both sheets rewire the components that bake Bootstrap\'s primary', () => {
    // Compiled here rather than read from dist/, so the check does not depend
    // on a build having run (`npm run production` cleans dist/ before testing).
    for (const entry of ['src/scss/adminlte-colors.scss', 'src/scss/adminlte-colors-v3.scss']) {
      const file = entry
      const css = compileScss(entry)
      // the components Bootstrap hard-codes #0d6efd into
      for (const selector of [
        '[data-lte-primary] .btn-primary',
        '[data-lte-primary] .btn-outline-primary',
        '[data-lte-primary] .nav-pills',
        '[data-lte-primary] .pagination',
        '[data-lte-primary] .progress',
        '[data-lte-primary] .list-group',
        '[data-lte-primary] .dropdown-menu',
        '[data-lte-primary] .form-check-input:checked',
        '[data-lte-primary] .card-primary'
      ]) {
        expect(css, `${file} → ${selector}`).toContain(selector)
      }

      // and a preset exists for every colour in that sheet's palette
      const colors = file.includes('-v3') ? paletteV3 : palette
      for (const c of colors as PaletteColor[]) {
        expect(css, `${file} → ${c.name}`).toContain(`[data-lte-primary=${c.name}]`)
      }

      // dark mode has to match the attribute on the same element as data-bs-theme
      expect(css, file).toContain('[data-bs-theme=dark][data-lte-primary=')
    }
  })

  it('the v3 palette reaches WCAG AA under data-lte-contrast="aa"', () => {
    const v3 = paletteV3 as PaletteColor[]
    const flipped = v3.filter(c => c.textColor !== c.textColorAA)
    // the eight the issue reports (#6110)
    expect(flipped.map(c => c.name).toSorted(byName)).toEqual(
      ['blue', 'cyan', 'fuchsia', 'green', 'lightblue', 'olive', 'pink', 'teal'].toSorted(byName)
    )

    for (const c of v3) {
      const ratio = c.textColorAA === 'white' ? c.contrastWhite : c.contrastBlack
      expect(ratio, `${c.name} ${c.hex} with ${c.textColorAA}`).toBeGreaterThanOrEqual(4.5)
    }

    // the designed palette needs no flips at all
    for (const c of palette as PaletteColor[]) {
      expect(c.textColorAA, c.name).toBe(c.textColor)
    }
  })

  it('the AA switch is emitted for the v3 sheet only, and only for the colours that need it', () => {
    const v3css = compileScss('src/scss/adminlte-colors-v3.scss')
    const flipped = (paletteV3 as PaletteColor[]).filter(x => x.textColor !== x.textColorAA)
    for (const c of flipped) {
      expect(v3css, `text-bg-${c.name}`).toContain(`[data-lte-contrast=aa] .text-bg-${c.name}`)
      expect(v3css, `primary ${c.name}`).toContain(`[data-lte-contrast=aa][data-lte-primary=${c.name}]`)
    }

    // colours that already pass are left alone — including the dark-text ones,
    // which keep v3's #1f2d3d rather than flipping to black
    for (const name of ['lime', 'orange', 'yellow', 'navy', 'maroon', 'red', 'gray']) {
      expect(v3css, name).not.toContain(`[data-lte-contrast=aa] .text-bg-${name}`)
    }

    // and the designed sheet emits nothing, so the switch costs it nothing
    expect(compileScss('src/scss/adminlte-colors.scss')).not.toContain('data-lte-contrast')
  })

  it('no sheet ships an unresolved Sass variable', () => {
    // Sass emits `$foo` verbatim inside a custom property value instead of
    // failing, so this class of typo is silent until the declaration is dropped
    // by the browser — which is how a broken pagination focus ring shipped
    // (#6109). Compilation is not enough; the output has to be scanned.
    for (const entry of ['src/scss/adminlte.scss', 'src/scss/adminlte-colors.scss', 'src/scss/adminlte-colors-v3.scss']) {
      const leftovers = [...new Set(compileScss(entry).matchAll(/\$[a-z][\w-]*/g).map(m => m[0]))]
      expect(leftovers, entry).toEqual([])
    }
  })

  it('presets only reference colours that exist', () => {
    const known = new Set([...colors.map(c => c.name), 'primary', 'success', 'danger', 'warning', 'info', 'secondary'])
    for (const set of sets as Array<{ name: string; colors: string[] }>) {
      for (const name of set.colors) {
        expect(known.has(name), `${set.name} → ${name}`).toBe(true)
      }
    }

    for (const skin of skins as Array<{ name: string; header: { cls: string }; sidebar: { cls: string }; boxes: string[] }>) {
      for (const name of skin.boxes) {
        expect(known.has(name), `${skin.name} → boxes ${name}`).toBe(true)
      }

      for (const cls of [skin.header.cls, skin.sidebar.cls]) {
        const name = cls.replace(/^(text-bg-|bg-gradient-)/, '')
        expect(known.has(name) || cls.startsWith('bg-body'), `${skin.name} → ${cls}`).toBe(true)
      }
    }
  })
})
