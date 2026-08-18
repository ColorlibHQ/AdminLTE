import { readFileSync } from 'node:fs'
import path from 'node:path'
import process from 'node:process'
import { describe, expect, it } from 'vitest'
// @ts-expect-error — plain ESM module without a declaration file (dev-only helper)
import { bootstrapThemeColors, contrastWhite, hueDistance, palette, sets, skins } from '../../src/utils/palette.mjs'

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
  role: 'chromatic' | 'neutral'
  oklch: { L: number; C: number; h: number }
}

const colors = palette as PaletteColor[]
const byName = (a: string, b: string) => a.localeCompare(b)

function readScssPalette(): Record<string, string> {
  const source = readFileSync(path.resolve(process.cwd(), 'src/scss/colors/_variables.scss'), 'utf8')
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
