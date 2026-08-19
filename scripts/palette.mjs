#!/usr/bin/env node
/**
 * The extended palette (dist/css/adminlte-colors.css) is generated, not picked.
 *
 *   node scripts/palette.mjs            regenerate the hexes from the OKLCH
 *                                       targets in src/utils/palette.mjs and
 *                                       print them as the SCSS map + JS lines
 *   node scripts/palette.mjs --check    verify that src/scss/colors/_variables.scss
 *                                       and src/utils/palette.mjs agree, that
 *                                       every colour takes white text at ≥ 4.5:1,
 *                                       and that hues keep their distance from
 *                                       each other and from Bootstrap's theme
 *                                       colours. Exit code 1 on any failure.
 *
 * Dev-only; `scripts/` is not published to npm.
 */

import { readFileSync } from 'node:fs'
import process from 'node:process'
import {
  bootstrapThemeColors,
  contrastWhite,
  designColor,
  hexToOklch,
  hueDistance,
  oklchToHex,
  palette,
  paletteTargets,
  paletteV3,
  skins,
  skinsV3
} from '../src/utils/palette.mjs'

const SCSS_FILE = new URL('../src/scss/colors/_variables.scss', import.meta.url)
const SCSS_V3_FILE = new URL('../src/scss/adminlte-colors-v3.scss', import.meta.url)
const MIN_WHITE_CONTRAST = 4.5
const MIN_HUE_GAP_PALETTE = 19.5 // degrees between chromatic palette colours (rule: 20°, with rounding slack)
const MIN_HUE_GAP_BOOTSTRAP = 15 // degrees from any Bootstrap theme colour

const fmt = lch => `oklch(${lch.L.toFixed(2)} ${lch.C.toFixed(2)} ${lch.h.toFixed(0)})`

/**
`$lte-palette` as { name: hex } read straight out of the SCSS source.
*/
function readScssPalette(file = SCSS_FILE) {
  const source = readFileSync(file, 'utf8')
  const start = source.indexOf('$lte-palette: (')
  const end = source.indexOf(') !default;', start)
  if (start === -1 || end === -1) {
    throw new Error('Could not find `$lte-palette: ( … ) !default;` in ' + file.pathname)
  }

  const map = {}
  for (const match of source.slice(start, end).matchAll(/"([a-z-]+)":\s*(#[\da-f]{6})/g)) {
    map[match[1]] = match[2]
  }

  return map
}

function generate() {
  const { cap, target, chromatic, neutral } = paletteTargets
  const rows = []
  for (const [name, hue] of Object.entries(chromatic)) {
    const d = designColor(hue, { cap, target })
    rows.push({ name, hex: d.hex, note: `${fmt(hexToOklch(d.hex))}  white ${contrastWhite(d.hex).toFixed(2)}:1` })
  }

  for (const [name, lch] of Object.entries(neutral)) {
    const hex = oklchToHex(lch)
    rows.push({ name, hex, note: `${fmt(hexToOklch(hex))}  white ${contrastWhite(hex).toFixed(2)}:1` })
  }

  console.log(`// Generated with cap ${cap}, white-text target ${target}:1\n$lte-palette: (`)
  for (const [i, r] of rows.entries()) {
    console.log(`  "${r.name}":${' '.repeat(Math.max(1, 11 - r.name.length))}${r.hex}${i < rows.length - 1 ? ',' : ' '} // ${r.note}`)
  }

  console.log(') !default;')

  const drift = rows.filter(r => palette.find(c => c.name === r.name)?.hex !== r.hex)
  if (drift.length > 0) {
    console.log(`\nDiffers from src/utils/palette.mjs: ${drift.map(r => `${r.name} (${palette.find(c => c.name === r.name)?.hex ?? 'missing'} → ${r.hex})`).join(', ')}`)
  } else {
    console.log('\nMatches src/utils/palette.mjs.')
  }
}

function check() {
  const problems = []
  const scss = readScssPalette()

  // 1. SCSS map and JS metadata agree, in both directions
  for (const c of palette) {
    if (!Object.hasOwn(scss, c.name)) {
      problems.push(`${c.name}: in src/utils/palette.mjs but not in $lte-palette`)
    } else if (scss[c.name] !== c.hex) {
      problems.push(`${c.name}: SCSS has ${scss[c.name]}, src/utils/palette.mjs has ${c.hex}`)
    }
  }

  for (const name of Object.keys(scss)) {
    if (palette.every(c => c.name !== name)) {
      problems.push(`${name}: in $lte-palette but not in src/utils/palette.mjs`)
    }
  }

  // 2. Every colour takes white text
  for (const c of palette) {
    const ratio = contrastWhite(c.hex)
    if (ratio < MIN_WHITE_CONTRAST) {
      problems.push(`${c.name} ${c.hex}: white text is ${ratio.toFixed(2)}:1, below ${MIN_WHITE_CONTRAST}:1`)
    }
  }

  // 3. Hue separation between chromatic colours …
  const chromatic = palette.filter(c => c.role === 'chromatic')
  const bootstrapChromatic = bootstrapThemeColors.filter(t => t.chroma > 0.05)
  for (const [i, a] of chromatic.entries()) {
    const later = chromatic.slice(i + 1)
    for (const b of later) {
      const gap = hueDistance(a.oklch.h, b.oklch.h)
      if (gap < MIN_HUE_GAP_PALETTE) {
        problems.push(`${a.name} and ${b.name} are only ${gap.toFixed(0)}° apart (min ${MIN_HUE_GAP_PALETTE}°)`)
      }
    }

    // … and from Bootstrap's chromatic theme colours
    for (const bs of bootstrapChromatic) {
      const gap = hueDistance(a.oklch.h, bs.hue)
      if (gap < MIN_HUE_GAP_BOOTSTRAP) {
        problems.push(`${a.name} is only ${gap.toFixed(0)}° from Bootstrap ${bs.name} (min ${MIN_HUE_GAP_BOOTSTRAP}°)`)
      }
    }
  }

  // 4. The legacy v3 sheet: SCSS map and JS data agree (values are historical — no other rules)
  const scssV3 = readScssPalette(SCSS_V3_FILE)
  for (const c of paletteV3) {
    if (!Object.hasOwn(scssV3, c.name)) {
      problems.push(`v3 ${c.name}: in src/utils/palette.mjs but not in adminlte-colors-v3.scss`)
    } else if (scssV3[c.name] !== c.hex) {
      problems.push(`v3 ${c.name}: SCSS has ${scssV3[c.name]}, src/utils/palette.mjs has ${c.hex}`)
    }
  }

  for (const name of Object.keys(scssV3)) {
    if (paletteV3.every(c => c.name !== name)) {
      problems.push(`v3 ${name}: in adminlte-colors-v3.scss but not in src/utils/palette.mjs`)
    }
  }

  // 5. `data-lte-contrast="aa"` has to leave every colour at or above AA
  for (const [label, colors] of [['', palette], ['v3 ', paletteV3]]) {
    for (const c of colors) {
      const ratio = c.textColorAA === 'white' ? c.contrastWhite : c.contrastBlack
      if (ratio < MIN_WHITE_CONTRAST) {
        problems.push(`${label}${c.name} ${c.hex}: still ${ratio.toFixed(2)}:1 with ${c.textColorAA} text under data-lte-contrast="aa"`)
      }
    }
  }

  // 6. Every skin's `data-lte-primary` is a colour that sheet actually has
  //    (Bootstrap's own theme colours are always available)
  const themeColors = new Set(['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark'])
  for (const [label, list, colors] of [['', skins, palette], ['v3 ', skinsV3, paletteV3]]) {
    const known = new Set([...colors.map(c => c.name), ...themeColors])
    for (const skin of list) {
      if (!skin.primary) {
        problems.push(`${label}skin "${skin.name}": no primary colour`)
      } else if (!known.has(skin.primary)) {
        problems.push(`${label}skin "${skin.name}": primary "${skin.primary}" is not in that palette`)
      }
    }
  }

  if (problems.length > 0) {
    console.error('palette check failed:')
    for (const p of problems) {
      console.error('  ✖ ' + p)
    }

    process.exitCode = 1
    return
  }

  console.log(`palette check passed: ${palette.length} colours, all ≥ ${MIN_WHITE_CONTRAST}:1 with white text, SCSS and JS in step; v3 sheet: ${paletteV3.length} colours in step; ${skins.length + skinsV3.length} skins name a primary that exists; every colour clears ${MIN_WHITE_CONTRAST}:1 under data-lte-contrast="aa".`)
  for (const c of palette) {
    console.log(`  ${c.name.padEnd(9)} ${c.hex}  ${fmt(hexToOklch(c.hex)).padEnd(24)} white ${contrastWhite(c.hex).toFixed(2)}:1`)
  }
}

if (process.argv.includes('--check')) {
  check()
} else {
  generate()
}
